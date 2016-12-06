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

      countryCode: '',
      country: '',
      city: '',
      regionName: '',
      isp: '',
      lat: '',
      lon: '',
      ip: '',
      timezone: '',
      zip: ''
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

            countryCode: userLog.countryCode,
            country: userLog.country,
            city: userLog.city,
            regionName: userLog.regionName,
            isp: userLog.isp,
            lat: userLog.lat,
            lon: userLog.lon,
            ip: userLog.ip,
            timezone: userLog.timezone,
            zip: userLog.zip,
          })
        })
        .catch(err => console.error(err));
     } else {
       this.setState({ isLoggedIn: false });
     }
  }

  render() {
//   <h2>Test: {this.state.title}</h2>
    if (!this.state.isLoggedIn) {
      return null;
    } else {
      return (
        <div>
      
          <AboutForm
            busy={this.state.busy}

            countryCode={this.state.countryCode}
            country={this.state.country}
            city={this.state.city}
            regionName={this.state.regionName}
            isp={this.state.isp}
            lat={this.state.lat}
            lon={this.state.lon}
            ip={this.state.ip}
            timezone={this.state.timezone}
            ziplat={this.state.zip}

            // backButtonPressed={this.backButtonPressed}
            // startTest={this.startTest}
            // previewTest={this.previewTest}
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
