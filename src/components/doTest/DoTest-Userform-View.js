import React from 'react';
// import ReactDOM from 'react-dom';

import Question from './Question-Userform-View';

class DoTestUserForm extends React.Component {
  componentDidMount() {
    // ReactDOM.findDOMNode(this.refs['inputTitle']).focus();
  }

  render() {
    return (
      <div className='form-container col-sm-12'>
        <form className='form-horizontal' onSubmit={this.props.onSubmit} >
          {
            this.props.questions
              .map((q, idx) => <Question
                disabled={this.props.busy}
                key={idx}
                question={q}
                idx={idx}
                checked={this.props.questions[idx].givenAnswer && Number(this.props.questions[idx].givenAnswer.slice(-1)) - 1}
              />)
          }

          <div className='form-group'>
            <input type='submit' className='btn btn-primary' value='Hand In' disabled={this.props.busy} />
          </div>
        </form>
      </div>
    );
  }
}

DoTestUserForm.propTypes = {
  busy: React.PropTypes.bool.isRequired,
  questions: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired
}

DoTestUserForm.defaultProps = {
  busy: false
}

export default DoTestUserForm;
