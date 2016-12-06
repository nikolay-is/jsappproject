import React from 'react';

import { getTests } from '../../models/Test';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') || undefined,
      tests: []
    }
  }

  componentWillMount() {
    let testList = [];

    if (this.state.isLoggedIn)
      getTests()
        .then(tests => {
          testList = tests;
          this.setState({ tests: testList });
        })
        .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h2>&nbsp;</h2>
          { window.sessionStorage.getItem('userId') &&
            <div className='testList col-sm-12'>
            {
              this.state.tests.map(test => {
                return <div className='test col-sm-10' key={test._id}>
                  <p><strong>{test.title}</strong></p>
                  <p className='description'>{test.description}</p>
                  <Link to={"/tests/" + test._id + "/details"}>Go to test details</Link>
                </div>
              })
            }
            </div>
          }
      </div>
    );
  }
}

Home.propTypes = {}
Home.defaultProps = {}

export default Home;
