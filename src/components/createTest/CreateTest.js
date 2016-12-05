import React from 'react';

import Observer from '../../utilities/observer';
// import ERR from '../../utilities/err';
import { create } from '../../models/Test';
import CreateTestUserForm from './CreateTest-Userform-View.js';

class CreateTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,

      title: '',
      description: '',
      questions: [{
        id: 0,
        question: '',
        a0: '', a1: '', a2: '', a3: '', answer: 'Answer 1'
      }],
      total_questions: 0,
      total_participants: 0,      
      top_user: '',
      top_score: 0,
      best_time: new Date()
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onQuestionChange = this.onQuestionChange.bind(this);
  }

  componentWillMount() {
    console.log('did mount')
    Observer.onQuestionChange = this.onQuestionChange;
  }

  onQuestionChange(ev) {
    let questions = this.state.questions;
    let idx = Number(ev.target.attributes['data-id'].value);
    questions[idx][ev.target.name] = ev.target.value;
    console.log(ev.target.value);

    this.setState({ questions: questions });

    ev.preventDefault();    
  }

  onChangeHandler(ev) {
    let nextState = {};
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
    
    ev.preventDefault();
  }

  onSubmitHandler(ev) {
    if ( !(this.state.title.length && this.state.description.length && this.state.questions.length >= 5) ) {

      alert('Bad Test data');
    } else {
      let startDateTime = this.state.best_time; 
      let endDateTime = new Date();
      let dateDiff = endDateTime - startDateTime;
      console.log(endDateTime);
      console.log(startDateTime);
      console.log(dateDiff); 
      this.setState({ busy: true });
      this.setState({ 
        total_questions: Number(this.state.questions.length),
        total_participants: 0,      
        top_user: '',
        top_score: 0,
        best_time: dateDiff        
      });

      create({ title: this.state.title, description: this.state.description, questions: this.state.questions, total_questions: this.state.total_questions, total_participants: this.state.total_participants, top_user: this.state.top_user, top_score: this.state.top_score, best_time: this.state.best_time })
        .then(result => {
          this.context.router.push('/');
        })
        .catch(err => {
          console.error(err);
          this.setState({ busy: false });
        });
    }
    ev.preventDefault();
  }

  onAddQuestion(ev) {
    let questions = this.state.questions;
    let id = questions[questions.length - 1].id + 1;
    questions.push({
      id: id,
      question: '',
      a0: '', a1: '', a2: '', a3: '', answer: 'Answer 1'
    });

    this.setState({ questions: questions });

    ev.preventDefault();
  }

  render() {
    if (!this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Create New Test</h2>
        <CreateTestUserForm
          busy={this.state.busy}
          title={this.state.title}
          description={this.state.description}

          questions={this.state.questions}

          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
          onAddQuestion={this.onAddQuestion}
        />
      </div>
    );
  }
}

CreateTest.contextTypes = {
  router: React.PropTypes.object
};

CreateTest.propTypes = {}
CreateTest.defaultProps = {}

export default CreateTest;
