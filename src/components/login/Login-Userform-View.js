import React from 'react';
import ReactDOM from 'react-dom';

class LoginUserForm extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs['inputUsername']).focus();
  }

  render() {
    return (
      <div className='form-container col-sm-8'>
        <form className='form-horizontal' onSubmit={this.props.onSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='col-sm-3 control-label'>Username</label>
              <div className='input-group col-sm-4'>
                <div className='input-group-addon'>#</div>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  name='username'
                  ref='inputUsername'
                  disabled={this.props.busy}
                  value={this.props.username}
                  onChange={this.props.onChange}
                  autoFocus
                />
              </div>
          </div><br />

          <div className='form-group'>
            <label htmlFor='password' className='col-sm-3 control-label'>Password</label>
              <div className='input-group col-sm-4'>
                <div className='input-group-addon'>#</div>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  disabled={this.props.busy}
                  value={this.props.password}
                  onChange={this.props.onChange}
                />
              </div>
          </div><br />

          <div className='form-group'>
            <input type='submit' className='btn btn-primary' value='Login' disabled={this.props.busy} />
          </div>
        </form>
      </div>
    );
  }
}

LoginUserForm.propTypes = {
   busy: React.PropTypes.bool.isRequired,
   onChange: React.PropTypes.func.isRequired,
   onSubmit: React.PropTypes.func.isRequired,
   username: React.PropTypes.string.isRequired,
   password: React.PropTypes.string.isRequired,
}

LoginUserForm.defaultProps = {
  busy: false,
  username: '',
  password: ''
}

export default LoginUserForm;
