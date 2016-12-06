import React from 'react';

import Observer from '../../utilities/observer';
import ERR from '../../utilities/err';
import { userLogin } from '../../models/User';
import LoginUserForm from './Login-Userform-View';
import { getClientInfo } from '../../models/UserLog';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId'),
      busy: false,
      username: '',
      password: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.saveSession = this.saveSession.bind(this);
    this.updateClientInfo = this.updateClientInfo.bind(this);
  }

  onChangeHandler(ev) {
    let nextState = {};
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);

    ev.preventDefault();
  }

  onSubmitHandler(ev) {
    this.setState({ busy: true });

    userLogin(this.state.username, this.state.password)
      .then(userData => {
        this.saveSession(userData);
        Observer.onSessionUpdate();

        this.context.router.push('/');
      })
      .catch(err => {
        console.error(err);
        this.setState({
          busy: false,
          username: '',
          password: ''
        });
      });

    ev.preventDefault();
  }

  saveSession(userData) {
    let userId = userData._id || undefined;
    let userName = userData.username || undefined;
    let authToken = userData._kmd.authtoken || undefined;

    if ( !(userId && userName && authToken) )
      return new Promise((resolve, reject) => reject(ERR.BAD_USER_DATA));

    window.sessionStorage.setItem('userId', userId);
    window.sessionStorage.setItem('userName', userName);
    window.sessionStorage.setItem('authToken', authToken);

    this.updateClientInfo(userId);
  }

  updateClientInfo(userId) {
    getClientInfo ('http://ip-api.com/json', userId)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Login</h2>
        <LoginUserForm
          busy={this.state.busy}
          username={this.state.username}
          password={this.state.password}

          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
        />
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

Login.propTypes = {}
Login.defaultProps = {}

export default Login; 
