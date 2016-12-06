import React from 'react';
import {Link} from 'react-router';

import { getTests } from '../../models/Test';
import { getUserTests } from '../../models/User';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') || undefined,

      tests: [],
      userTests: []
    }

    this.testLocked = this.testLocked.bind(this);
    this.testGetScore = this.testGetScore.bind(this);
    this.testGetTime = this.testGetTime.bind(this);
    this.testGetDate = this.testGetDate.bind(this);
  }

  componentWillMount() {
    let userTestsPromise = getUserTests(window.sessionStorage.getItem('userId'));
    let testsPromise = getTests();

    Promise.all([ userTestsPromise, testsPromise ])
      .then(([ userTests, tests ]) => this.setState({ tests: tests, userTests: userTests }))
      .catch(err => console.error(err));
  }

  testLocked(testId) {
    for (let test of this.state.userTests) {
      if (testId === test.id)
        return true;
    }

    return false;
  }

  testGetScore(testId) {
    for (let test of this.state.userTests) {
      if (testId === test.id)
        return test.result.score;
    }

    return null;
  }

  testGetTime(testId) {
    for (let test of this.state.userTests) {
      if (testId === test.id)
        return <span> Time: {test.result.time}</span>;
    }

    return null;
  }

testGetDate(testId) {
    for (let test of this.state.userTests) {
      if (testId === test.id)
        return <span>{test.result.date}</span>;
    }

    return null;
  }

  render() {
    return (
      <div id='home-content' className='col-sm-12'>
        <h2>&nbsp;</h2>
          { window.sessionStorage.getItem('userId') &&
            <div className='testList col-sm-12'>
            {
              this.state.tests.map(test => {
                return (<div className='test col-sm-12' key={test._id}>
                  {
                    this.testLocked(test._id)
                    ? <p className='home-test-status'>{ this.testGetDate(test._id) } <br />
                        <span> { this.testGetScore(test._id) + ' / ' + test.questions.length };</span>
                        <span> { this.testGetTime(test._id) }</span>
                      </p>
                    : <p className='home-test-status'>&nbsp;</p>
                  }
                  <p><strong>{test.title}</strong></p>
                  <p className='description'>{test.description}</p>
                  <Link to={"/tests/" + test._id + "/details"}>Go to test details</Link>
                </div>)
              })
            }
            </div>
          }
          {
            !window.sessionStorage.getItem('userId') &&
            <div id='home-foreground-img' className=''></div>
          }
      </div>
    );
  }
}

Home.propTypes = {}
Home.defaultProps = {}

export default Home;
