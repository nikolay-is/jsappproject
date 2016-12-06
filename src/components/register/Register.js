import React from 'react';

import Observer from '../../utilities/observer';
import ERR from '../../utilities/err';
import { userRegister } from '../../models/User';
import RegisterUserForm from './Register-Userform-View';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId'),
      busy: false,
      username: '',
      email: '',
      password: '',
      password2: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.saveSession = this.saveSession.bind(this);
  }

  onChangeHandler(ev) {
    let nextState = {};
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);

    ev.preventDefault();
  }

  onSubmitHandler(ev) {
    if ( !(this.state.password === this.state.password2) ) {
      this.setState({
        password: '',
        password2: ''
      });
    } else {
      this.setState({ busy: true });

      userRegister(this.state.username, this.state.password, this.state.email)
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
            email: '',
            password: '',
            password2: ''
          });
        });
    }

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
    window.sessionStorage.setItem('tests', []);
  }

  render() {
    if (this.state.isLoggedIn) this.context.router.push('/');

    return (
      <div>
        <h2>Register</h2>
        <RegisterUserForm
          busy={this.state.busy}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          password2={this.state.password2}

          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
        />
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.object
};

Register.propTypes = {}
Register.defaultProps = {}

export default Register;
