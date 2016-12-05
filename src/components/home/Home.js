import React from 'react';

import { getTests } from '../../models/Test';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: []
    }
  }

  componentWillMount() {
    let testList = [];

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
        <h2>Home</h2>
        <div className='testList col-sm-12'>
        {
          this.state.tests.map(test => {
            return <div className='test col-sm-7' key={test._id}>
              <p><strong>{test.title}</strong></p>
              <p className='description'>{test.description}</p>
               <Link to={"/testDetails/" + test._id}>Go to test details</Link>
            </div>
          })
        }
        </div>
      </div>
    );
  }
}

Home.propTypes = {}
Home.defaultProps = {}

export default Home;
