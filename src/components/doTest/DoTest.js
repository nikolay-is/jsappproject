import React from 'react';

import Observer from '../../utilities/observer';
import ERR from '../../utilities/err';
import { loadTestDetails, submitResult, lockTestForUser, updateTestStats, updateUserResults } from '../../models/Test';
import DoTestUserForm from './DoTest-Userform-View.js';

class DoTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,
      testId: this.props.params.id.trim(),

      title: '',
      description: '',
      questions: [],

      total_participants: 0,

    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this);
  }

  componentWillMount() {
    Observer.onQuestionAnswerChange = this.onQuestionAnswerChange;

    let loadTestData = loadTestDetails(this.state.testId);
    let userLock = lockTestForUser(this.props.params.id.trim(), window.sessionStorage.getItem('userId'));

    Promise.all([ loadTestData, userLock ])
      .then(([ testData, lockedUser ]) => {
        testData.questions.filter(q => q.givenAnswer).forEach(q => delete q.givenAnswer);

        let nextState = {
          title: testData.title || '',
          description: testData.description || '',
          questions: testData.questions || [],
          total_participants: Number(testData.total_participants) || 0,
          top_user: testData.top_user || '',
          top_score: testData.top_score || 0,
          best_time: testData.best_time || 0
        };

        if ( !(testData.title && testData.questions && testData.questions.length) ) {
          console.error(ERR.BAD_TEST);
          this.context.router.push('/');
        } else {
          this.setState(nextState);
        }
      })
      .catch(err => console.error(err));
  }

  onQuestionAnswerChange(ev) {
    let questions = this.state.questions;
    let q = Number(ev.target.attributes['data-id'].value);    // Question num
    let a = 'Answer ' + (Number(ev.target.id.slice(1)) + 1);
    questions[q].givenAnswer = a;

    this.setState({ questions: questions });
  }

  onSubmitHandler(ev) {
    let testScore = 0;

    this.state.questions
      .forEach(q => q.givenAnswer && q.givenAnswer === q.answer && ++testScore);

    let top_user = this.state.top_user || ''
    if (!this.state.top_user || testScore > this.state.top_score)
      top_user = window.sessionStorage.getItem('userName');

    let resultsData = submitResult({
      id: this.state.testId,
      result: {
        title: this.state.title,
        description: this.state.description,
        questions: this.state.questions,

        userId: window.sessionStorage.getItem('userId'),
        userName: window.sessionStorage.getItem('userName'),
        date: Date.now()
      }
    });

    let userResultData = updateUserResults({
      id: window.sessionStorage.getItem('userId'),
      testId: this.state.testId,
      score: testScore,
      time: 0,
      date: new Date()
    })

    let testData = updateTestStats(this.state.testId, {
      title: this.state.title,
      description: this.state.description,
      questions: this.state.questions,
      total_participants: this.state.total_participants + 1,
      top_user: top_user,
      top_score: Math.max(this.state.top_score, testScore),
      best_time: this.state.best_time
    });

    Promise.all([ resultsData, userResultData, testData ])
      .then(() => this.context.router.push('/'))
      .catch(err => console.error(err));

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
          onSubmit={this.onSubmitHandler}
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
