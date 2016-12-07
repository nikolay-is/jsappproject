import React from 'react';

// import ERR from '../../utilities/err';
import AboutForm from './About-Userform-View.js';
import { loadUserLog } from '../../models/UserLog';

class UserLog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: window.sessionStorage.getItem('userId') && true,
      busy: false,

      userlogs: []
    };

  }

  componentWillMount() {
    let currentUserId = window.sessionStorage.getItem('userId');
    if (currentUserId) {
      loadUserLog(currentUserId)
        .then(userLog =>{
          console.log(userLog);
          this.setState({
            isLoggedIn: true,
            userlogs: userLog
          })
        })
        .catch(err => console.error(err));
     } else {
       this.setState({ isLoggedIn: false,  userlogs: [] });
     }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <h2>SPA (Single-Page Application)</h2>
          <h3>1.	Technologies</h3>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	JavaScript:</h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	AJAX, REST </strong> for communication to external api and the <strong>back-end.</strong></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	ReactJS </strong> for rendering the templates for the  <strong>UI.</strong></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	Models, Views, Controllers, Services, Helpers  </strong> and  <strong>Entities.</strong></p>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	HTML & CSS:</h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	Bootstrap.</strong></p>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	Kinvey :</h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	Kinvey</strong> – for <strong>back-end </strong> and <strong>Kinvey API.</strong></p>
          <h3>2.	Open-source</h3>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	<strong>Source Control System</strong></h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	Source code </strong> is public on <strong>GitHub.</strong></p>
          <h3>3.	Functionality</h3>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	<strong>User management</strong></h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	User registration, login</strong> and <strong>logout.</strong></p>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o	<strong>CRUD operation.</strong></h4>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>•	Create, Edit, View and Delete.</strong></p>
        </div>
        )
    } else {
      return (
        <div>
          <h2>Login statistics</h2>
          <AboutForm
            busy={this.state.busy}
            userlogs={this.state.userlogs}
          />
        </div>
      );
    }
  }
}

UserLog.contextTypes = {
  router: React.PropTypes.object
};

UserLog.propTypes = {}
UserLog.defaultProps = {}

export default UserLog;
