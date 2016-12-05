import React from 'react';

// import ERR from '../../utilities/err';
import TestDetailsUserForm from './TestDetails-Userform-View.js';
import { loadTestDetails } from '../../models/Test';

class TestDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,

      test: {}
    };

    this.backButtonPressed = this.backButtonPressed.bind(this);
    this.startTest = this.startTest.bind(this);
    this.previewTest = this.previewTest.bind(this);
  }

  componentWillMount() {
    let currentTest = {};
    let currentTestId = this.props.params.testId; //'58455cdb00a5907e7dfed67a'
    
    loadTestDetails(currentTestId)
      .then(test => {
        currentTest = test;
        this.setState({ test: currentTest });
      })
      .catch(err => console.error(err));
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
        <h2>Test Details</h2>
        <TestDetailsUserForm
          test={this.state.test}
          busy={this.state.busy}
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
