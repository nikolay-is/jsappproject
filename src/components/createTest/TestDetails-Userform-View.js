import React from 'react';

class TestDetailsUserForm extends React.Component {
  render() {
    return (
      <div id="test-details" className='col-sm-12'>
        <div className='test-details-description col-sm-11' style={{float: 'none'}}>
          <p><pre>{this.props.description}</pre></p>
        </div>

        <div className='test-details-total-questions col-sm-10' style={{float: 'none'}}>
          <p className='col-sm-4' style={{float: 'none'}}>Total Questions:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.questionsCount}</span>
          </p>
        </div>

        <div className='test-details-total-participants col-sm-10' style={{float: 'none'}}>
          <p className='col-sm-4' style={{float: 'none'}}>Total Participants:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.total_participants}</span>
          </p>
        </div>

        <div className='test-details-top-user' style={{float: 'none'}}>
          <p>Top User: <span>{this.props.top_user}</span></p>
        </div>

        <div className='test-details-top-score' style={{float: 'none'}}>
          <p>Top Score: <span>{this.props.top_score}</span></p>
        </div>

        <div className='test-details-best-time' style={{float: 'none'}}>
          <p>Best Time: <span>{this.props.best_time}</span></p>
        </div>

        <div id="back">
          <button className="btn btn-primary" onClick={this.props.backButtonPressed}>Home</button>
        </div>

        <div className="action">
        { this.props.isLoggedIn
          ? <button className="btn btn-success" onClick={this.props.startTest}>Start test</button>
          : <button className="btn btn-default" onClick={this.props.previewTest}>Preview</button>
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
  test: React.PropTypes.object.isRequired
}

TestDetailsUserForm.defaultProps = {
  busy: false
}

export default TestDetailsUserForm;
