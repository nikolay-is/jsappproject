import React from 'react';

// import ERR from '../../utilities/err';
import TestDetailsUserForm from './TestDetails-Userform-View.js';
import { loadTestDetails } from '../../models/Test';
import { getUserTests } from '../../models/User';

class TestDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,

      userTests: [],

      id: '',
      title: '',
      description: '',
      questionsCount: 0,
      total_participants: 0,
      top_user: '',
      top_score: 0,
      best_time: 0
    };

    this.backButtonPressed = this.backButtonPressed.bind(this);
    this.startTest = this.startTest.bind(this);
    this.previewTest = this.previewTest.bind(this);
  }

  componentWillMount() {
    let currentTestId = this.props.params.testId; //'58455cdb00a5907e7dfed67a'
    
    let testDetails = loadTestDetails(currentTestId);
    let userTests = getUserTests(window.sessionStorage.getItem('userId'));

    Promise.all([ testDetails, userTests ])
      .then(([ test, userTests ]) => {
        this.setState({
          id: test._id,
          title: test.title,
          description: test.description,
          questionsCount: test.questions && Number(test.questions.length),
          total_participants: Number(test.total_participants),
          top_user: test.top_user,
          top_score: Number(test.top_score),
          best_time: Number(test.best_time),

          userTests: userTests
        })
    }).catch(err => console.error(err));;
  }

  startTest() {
    console.log('startTest()');
  }

  previewTest() {
    console.log('previewTest()');
  }

  backButtonPressed() {
    this.context.router.push('/');
  }

  render() {
    if (!this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Test: {this.state.title}</h2>
        <TestDetailsUserForm
          busy={this.state.busy}

          testId={this.state.id}
          description={this.state.description}
          questionsCount={this.state.questionsCount}
          total_participants={this.state.total_participants}
          top_user={this.state.top_user}
          top_score={this.state.top_score}
          best_time={this.state.best_time}

          userTests={this.state.userTests}

          backButtonPressed={this.backButtonPressed}
          startTest={this.startTest}
          previewTest={this.previewTest}
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
