import React from 'react';

class AboutForm extends React.Component {
  render() {
    let tableRows = this.props.userlogs.map((userLog, idx) =>
        <tr key={userLog._id}>
            <td>{userLog.ip}</td>
            <td>{userLog.countryCode}</td>
            <td>{userLog.country}</td>
            <td>{userLog.city}</td>
            <td>{userLog.regionName}</td>
            <td>{userLog.isp}</td>
            <td>{userLog.timezone}</td>
            <td>{userLog.lat}</td>
            <td>{userLog.lon}</td>
            <td>{userLog._kmd.ect}</td>
            <td>{userLog.zip}</td>
        </tr>)

    return (
      <div id="about" className='col-sm-12'>
        <table className="user-log-table">
            <thead>
                <tr>
                    <th>Ip address</th>                
                    <th>Country Code</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Region Name</th>
                    <th>Internet provider</th>
                    <th>Time Zone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Login Time UTC</th>                    
                    <th>Zip code</th>
                </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
        </table>
      </div>
    );
  }
}

AboutForm.contextTypes = {
  router: React.PropTypes.object
}

AboutForm.propTypes = {
  busy: React.PropTypes.bool.isRequired
}

AboutForm.defaultProps = {
  busy: false
}

export default AboutForm;
