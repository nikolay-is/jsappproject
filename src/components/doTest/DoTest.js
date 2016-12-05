import React from 'react';

import Observer from '../../utilities/observer';
// import ERR from '../../utilities/err';
import { getTestData } from '../../models/DoTest';
import DoTestUserForm from './DoTest-Userform-View.js';

class DoTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,
      testId: this.props.params.id.trim(),

      questions: []
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this);
  }

  componentWillMount() {
    getTestData(this.state.testId)
      .then(testData => {
        let nextState = {};
        nextState.title = testData.title || 'Test Title is Missing!';
        nextState.questions = testData.questions || [];
        this.setState(nextState);
      })
      .catch(err => console.error(err));

    Observer.onQuestionAnswerChange = this.onQuestionAnswerChange;
  }

  onQuestionAnswerChange(ev) {
    let questions = this.state.questions;
    let idx = Number(ev.target.attributes['data-id'].value);
    questions[idx][ev.target.name] = ev.target.value;

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
    ev.preventDefault();
  }

  render() {
    if (!this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Quiz: {this.state.title}</h2>
        <DoTestUserForm
          busy={this.state.busy}

          questions={this.state.questions}

          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
          onAddQuestion={this.onAddQuestion}
        />
      </div>
    );
  }
}

DoTest.contextTypes = {
  router: React.PropTypes.object
};

DoTest.propTypes = {}
DoTest.defaultProps = {}

export default DoTest;
