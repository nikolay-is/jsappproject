import React from 'react';
import { Link } from 'react-router';

import Observer from './utilities/observer';
import Header from './components/Header';
import { userLogout } from './models/User';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userName: ''
    }

    this.onSessionUpdate = this.onSessionUpdate.bind(this);
    this.checkUserCredentials = this.checkUserCredentials.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    Observer.onSessionUpdate = this.onSessionUpdate;
    this.checkUserCredentials();
  }

  onSessionUpdate() {
    this.checkUserCredentials();
  }

  checkUserCredentials() {
    let userName = window.sessionStorage.getItem('userName') || undefined;
    if (userName) {
      this.setState({ isLoggedIn: true, userName: userName });
    } else {
      this.setState({ isLoggedIn: false, userName: '' });
    }
  }

  onLogout() {
    userLogout()
      .then(result => {
        if (result) window.sessionStorage.clear();

        this.checkUserCredentials();
        this.context.router.push('/');
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container'>
        <Header isLoggedIn={this.state.isLoggedIn} currentUser={this.state.userName}>
          <Link to='/' className='btn btn-default'>Home</Link>
          { this.state.isLoggedIn &&
            <Link to='/createTest' className='btn btn-default'>Create A Test</Link>
          }
            <Link to='/testDetails' className='btn btn-default'>Test Details</Link>          
          { !this.state.isLoggedIn &&
            <Link to='/login' className='btn btn-success'>Login</Link>
          }
          { !this.state.isLoggedIn &&
            <Link to='/register' className='btn btn-default'>Register</Link>
          }
          {
            this.state.isLoggedIn &&
            <Link to='/logout' className='btn btn-default' onClick={this.onLogout}>Logout</Link>
          }
          <Link to='/about' className='btn btn-default'>About</Link>
        </Header>
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};

App.propTypes = {
  children: React.PropTypes.object
}

App.defaultProps = {
  children: {}
}

export default App;