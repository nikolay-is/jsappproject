import React from 'react';

class TestDetailsUserForm extends React.Component {
  render() {
    return (
      <div id="test-details" className='col-sm-12'>
          <div className='test-details-title'>
            <p>{this.props.test.title || undefined}</p>
          </div>

          <div className='test-details-description'>
            <p>{this.props.test.description || undefined}</p>
          </div>

          <div className='test-details-total-questions'>
            <p>Total Questions: {this.props.test.total_questions || undefined}</p>
          </div>

          <div className='test-details-total-participants'>
            <p>Total Participants: {this.props.test.total_participants || undefined}</p>
          </div>

          <div className='test-details-top-user'>
            <p>Top User: {this.props.test.top_user || undefined}</p>
          </div>

          <div className='test-details-top-score'>
            <p>Top Score: {this.props.test.top_score || undefined}</p>
          </div>

          <div className='test-details-best-time'>
            <p>Best Time: {this.props.test.best_time || undefined}</p>
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
