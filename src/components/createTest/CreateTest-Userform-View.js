import React from 'react';
import ReactDOM from 'react-dom';

import Question from './Question-Userform-View';

class CreateTestUserForm extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs['inputTitle']).focus();
  }

  render() {
    return (
      <div className='form-container col-sm-12'>
        <form className='form-horizontal' onSubmit={this.props.onSubmit}>

          <div className='form-group'>
            <label htmlFor='title' className='col-sm-3 control-label title'>Title</label>
              <div className='input-group col-sm-4'>
                <div className='input-group-addon'>#</div>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  ref='inputTitle'
                  disabled={this.props.busy}
                  value={this.props.title}
                  onChange={this.props.onChange}
                  autoFocus
                />
              </div>
          </div><br />

          <div className='form-group'>
            <label htmlFor='description' className='col-sm-3 control-label description'>Short Description</label>
              <div className='input-group col-sm-8'>
                <div className='input-group-addon'>#</div>
                <textarea
                  rows='3'
                  className='form-control'
                  id='description'
                  name='description'
                  ref='inputDescription'
                  disabled={this.props.busy}
                  value={this.props.description}
                  onChange={this.props.onChange}
                  spellCheck={false}
                />
              </div>
          </div><br />

          {
            this.props.questions.map((q, idx) => <Question key={idx} question={q} idx={idx} />)
          }

          <div className='form-group'>
            <button
                   className='btn btn-default next'
                   disabled={this.props.busy}
                   onClick={this.props.onAddQuestion}>Add Question
            </button>
          </div>

          <div className='form-group'>
            <input type='submit' className='btn btn-primary' value='Create' disabled={this.props.busy} />
          </div>
        </form>
      </div>
    );
  }
}

CreateTestUserForm.propTypes = {
  busy: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  questions: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
}

CreateTestUserForm.defaultProps = {
  busy: false,
  title: '',
  description: ''
}

export default CreateTestUserForm;
