import React from 'react';

class TestDetailsUserForm extends React.Component {
  render() {
    let isTestLocked = false;
    for (let test of this.props.userTests)
      if (this.props.testId === test.id) {
        isTestLocked = true; break;
      }

    return (
      <div id="test-details" className='col-sm-10' style={{float: 'none'}}>
        <div className='test-details-description col-sm-10' style={{float: 'none'}}>
          <pre>{this.props.description}</pre>
        </div>

        <div className='test-details-total-questions col-sm-10' style={{float: 'none'}}>
          <p className='col-sm-4' style={{float: 'none'}}>Total Questions:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.questionsCount}</span>
          </p>
          <p className='col-sm-4' style={{float: 'none'}}>Total Participants:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.total_participants}</span>
          </p>
          <p className='col-sm-4' style={{float: 'none'}}>Top User: <span>{this.props.top_user}</span></p>
          <p className='col-sm-4' style={{float: 'none'}}>Top Score: <span>{this.props.top_score}</span></p>
          <p className='col-sm-4' style={{float: 'none'}}>Best Time: <span>{this.props.best_time}</span></p>
        </div>

        <div id='test-details-btn-container' className='col-sm-10'>
          <button className="btn btn-primary" onClick={this.props.backButtonPressed}>Home</button>

          { isTestLocked
            ? <button className="btn btn-default" onClick={this.props.previewTest}>Preview</button>
            : <button className="btn btn-success" onClick={this.props.startTest}>Start test</button>
          }
        </div>
      </div>
    );
  }
}

TestDetailsUserForm.contextTypes = {
  router: React.PropTypes.object
}

TestDetailsUserForm.propTypes = {
  busy: React.PropTypes.bool.isRequired,

  testId: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  questionsCount: React.PropTypes.number.isRequired,
  total_participants: React.PropTypes.number.isRequired,
  top_user: React.PropTypes.string.isRequired,
  top_score: React.PropTypes.number.isRequired,
  best_time: React.PropTypes.number.isRequired,

  userTests: React.PropTypes.array.isRequired,

  backButtonPressed: React.PropTypes.func.isRequired,
  startTest: React.PropTypes.func.isRequired,
  previewTest: React.PropTypes.func.isRequired
}

TestDetailsUserForm.defaultProps = {
  busy: false,
  description: '',
  userTests: []
}

export default TestDetailsUserForm;
