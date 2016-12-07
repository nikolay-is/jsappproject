import React from 'react';

import ERR from '../../utilities/err';
import { findTestInResults, loadUserTestResults } from '../../models/Test';
import PreviewQuestion from './PreviewTest-View';

class PreviewTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: (window.sessionStorage.getItem('userId') && true) || false,
      testId: this.props.params.testId,

      title: '',
      description: '',
      questions: []
    }
  }

  componentWillMount() {
    if (!this.state.isLoggedIn) this.context.router.push('/');

    findTestInResults(this.state.testId)
      .then(resultId => {
        if (resultId) {
          loadUserTestResults(resultId)
            .then(resultDetails => {
              this.setState({
                title: resultDetails.result.title,
                description: resultDetails.result.description || '',
                questions: resultDetails.result.questions || []
              })
            })
            .catch(err => console.error(err));            
        } else {
          console.error(ERR.CANNOT_FIND_TEST_RESULT)
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.questions);
    return (
      <div id='user-test-result col-sm-8'>
        <h2>{this.state.title}</h2>
        <div className='user-test-result-description'>
          <pre>{this.state.description}</pre>
        </div>

        <div id='user-test-result-questions-container'>
          {
            this.state.questions
              .map(q => <PreviewQuestion
                key={q.id}
                id={q.id}
                isLoggedIn={this.state.isLoggedIn}
                question={q.question}
                answers={[q.a0 ? q.a0 : undefined,
                          q.a1 ? q.a1 : undefined,
                          q.a2 ? q.a2 : undefined,
                          q.a3 ? q.a3 : undefined,
                          q.a4 ? q.a4 : undefined,
                          q.a5 ? q.a5 : undefined
                ]}
                correctAnswer={q.answer}
                givenAnswer={q.givenAnswer}
              />)
          }
        </div>
      </div>
    );
  }
}

PreviewTest.contextTypes = {
  router: React.PropTypes.object
};

PreviewTest.propTypes = {}
PreviewTest.defaultProps = {}

export default PreviewTest;
