import React from 'react';

// import Observer from '../../utilities/observer';
// import ERR from '../../utilities/err';
import CreateTestUserForm from './CreateTest-Userform-View.js';

class CreateTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId'),
      busy: false,

      title: '',
      description: '',
      questions: [{
        id: 0,
        image: undefined,
        0: '', 1: '', 2: '', 3: '',
        answer: undefined
      }]
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddQuestion = this.onAddQuestion.bind(this);
  }

  onChangeHandler(ev) {
    let nextState = {};
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);

    ev.preventDefault();
  }

  onSubmitHandler(ev) {
    ev.preventDefault();
  }

  onAddQuestion(ev) {
    console.log('In');
    let questions = this.state.questions;
    let id = questions[questions.length - 1].id + 1;
    questions.push({
      id: id,
      image: undefined,
      0: '', 1: '', 2: '', 3: '',
      answer: undefined
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
