import React from 'react';

//import Observer from '../../utilities/observer';
// import ERR from '../../utilities/err';
//import { create } from '../../models/Test';
import TestDetailsUserForm from './TestDetails-Userform-View.js';

class TestDetails extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.location.pathname);
    console.log(this.props.location);
    console.log(this.props.params.testId);
    
    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,

      title: '',
      description: '',
      total_questions: 0,
      total_participants: 0,      
      top_user: '',
      top_score: 0,
      best_time: new Date(),
      testId: this.props.params.testId
    };

    // this.onChangeHandler = this.onChangeHandler.bind(this);
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
    // this.onAddQuestion = this.onAddQuestion.bind(this);
    // this.onQuestionChange = this.onQuestionChange.bind(this);
  }

//   componentWillMount() {
//     Observer.onQuestionChange = this.onQuestionChange;
//   }

//   onQuestionChange(ev) {
//     let questions = this.state.questions;
//     let idx = Number(ev.target.attributes['data-id'].value);
//     questions[idx][ev.target.name] = ev.target.value;
//     console.log(ev.target.value);

//     this.setState({ questions: questions });

//     ev.preventDefault();    
//   }

//   onChangeHandler(ev) {
//     let nextState = {};
//     nextState[ev.target.name] = ev.target.value;
//     this.setState(nextState);
    
//     ev.preventDefault();
//   }

//   onSubmitHandler(ev) {
//     if ( !(this.state.title.length && this.state.description.length && this.state.questions.length >= 5) ) {
//       alert('Bad Test data');
//     } else {
//       let startDateTime = this.state.best_time; 
//       let endDateTime = new Date();
//       let dateDiff = endDateTime - startDateTime;
//       this.setState({ busy: true });
//       this.setState({ 
//         total_questions: Number(this.state.questions.length),
//         total_participants: 0,      
//         top_user: '',
//         top_score: 0,
//         best_time: dateDiff        
//       });



  render() {
    if (!this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Test Details</h2>
        <TestDetailsUserForm
          busy={this.state.busy}
          title={this.state.title}
          description={this.state.description}
          total_questions={this.state.total_questions}
          total_participants={this.state.total_participants}
          top_user={this.state.top_user}
          top_score={this.state.top_score}
          best_time={this.state.best_time}
          testId={this.state.testId}

        //   onChange={this.onChangeHandler}
        //   onSubmit={this.onSubmitHandler}
        //   onAddQuestion={this.onAddQuestion}
        />
      </div>
    );
  }
}

TestDetails.contextTypes = {
  router: React.PropTypes.object
};

TestDetails.propTypes = {}
TestDetails.defaultProps = {}

export default TestDetails;
