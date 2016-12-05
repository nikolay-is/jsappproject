import React from 'react';
//import ReactDOM from 'react-dom';

//import Question from './Question-Userform-View';

import { loadTestDetails } from '../../models/Test';

class TestDetailsUserForm extends React.Component {
//   componentDidMount() {
//     ReactDOM.findDOMNode(this.refs['inputTitle']).focus();
//   }

  componentWillMount() {
    let currentTest = {};
    let currentTestId= this.props.testId; //'58455cdb00a5907e7dfed67a'

    console.log(currentTestId);
    
    loadTestDetails(currentTestId)
      .then(test => {
        currentTest = test;
        this.setState({ test: currentTest });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (

      <div className='form-container col-sm-12'>
        <form className='form-horizontal' onSubmit={this.props.onSubmit} >

          <div className='form-group'>
            <label htmlFor='title' className='col-sm-3 control-label title'>Title</label>
              <div className='input-group col-sm-4'>
                <p
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  ref='inputTitle'
                  disabled={this.props.busy}
                  value={this.props.title}
                  //onChange={false} //this.props.onChange
                  autoFocus
                />
              </div>
          </div><br />

          <div className='form-group'>
            <label htmlFor='description' className='col-sm-3 control-label description'>Description</label>
              <div className='input-group col-sm-8'>
                <textarea
                  rows='3'
                  className='form-control'
                  id='description'
                  name='description'
                  ref='inputDescription'
                  disabled={this.props.busy}
                  value={this.props.description}
                  //onChange={false} //this.props.onChange
                  spellCheck={false}
                />
              </div>
          </div><br />

          <div className='form-group'>
            <label htmlFor='total_questions' className='col-sm-3 control-label description'>Number of questions</label>
              <div className='input-group col-sm-8'>
                <p
                  type='text'
                  className='form-control'
                  id='total_questions'
                  name='total_questions'
                  ref='total_questions'
                  disabled={this.props.busy}
                  value={this.props.total_questions}
                />
              </div>
          </div><br />

          <div className='form-group'>
            <label htmlFor='total_participants' className='col-sm-3 control-label description'>Total Participants</label>
              <div className='input-group col-sm-8'>
                <p
                  type='text'
                  className='form-control'
                  id='total_participants'
                  name='total_participants'
                  ref='total_participants'
                  disabled={this.props.busy}
                  value={this.props.total_participants}
                />
              </div>
          </div><br />          

          <div className='form-group'>
            <label htmlFor='top_user' className='col-sm-3 control-label description'>Top User</label>
              <div className='input-group col-sm-8'>
                <p
                  type='text'
                  className='form-control'
                  id='top_user'
                  name='top_user'
                  ref='top_user'
                  disabled={this.props.busy}
                  value={this.props.top_user}
                />
              </div>
          </div><br />          

          <div className='form-group'>
            <label htmlFor='top_score' className='col-sm-3 control-label description'>Top Score</label>
              <div className='input-group col-sm-8'>
                <p
                  type='text'
                  className='form-control'
                  id='top_score'
                  name='top_score'
                  ref='top_score'
                  disabled={this.props.busy}
                  value={this.props.top_score}
                />
              </div>
          </div><br />          

          <div className='form-group'>
            <label htmlFor='best_time' className='col-sm-3 control-label description'>Best Time</label>
              <div className='input-group col-sm-8'>
                <p
                  type='text'
                  className='form-control'
                  id='best_time'
                  name='best_time'
                  ref='best_time'
                  disabled={this.props.busy}
                  value={this.props.best_time}
                />
              </div>
          </div><br />          

          <div className='form-group'>
            <input type='submit' className='btn btn-primary' value='Start Test' disabled={this.props.busy} />
          </div>
        </form>
      </div>
    );
  }
}

TestDetailsUserForm.propTypes = {
  busy: React.PropTypes.bool,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
//   onChange: React.PropTypes.func.isRequired,
//   onSubmit: React.PropTypes.func.isRequired
}

TestDetailsUserForm.defaultProps = {
  busy: false,
  title: '',
  description: ''
}

export default TestDetailsUserForm;
