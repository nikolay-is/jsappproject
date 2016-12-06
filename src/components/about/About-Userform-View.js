import React from 'react';

class AboutForm extends React.Component {
  render() {
    return (
      <div id="about" className='col-sm-12'>
        <div className='about-description col-sm-11' style={{float: 'none'}}>
          <p><pre>{this.props.description}</pre></p>
        </div>

        <div className='about-total-country-code col-sm-10' style={{float: 'none'}}>
          <p className='col-sm-4' style={{float: 'none'}}>Country Code:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.countryCode}</span>
          </p>
        </div>

        <div className='about-total-country col-sm-10' style={{float: 'none'}}>
          <p className='col-sm-4' style={{float: 'none'}}>Country:
            <span className='col-sm-1' style={{float: 'none'}}>{this.props.country}</span>
          </p>
        </div>

        <div className='about-city' style={{float: 'none'}}>
          <p>City: <span>{this.props.city}</span></p>
        </div>

        <div className='about-region-name' style={{float: 'none'}}>
          <p>Region Name: <span>{this.props.regionName}</span></p>
        </div>

        <div className='about-isp' style={{float: 'none'}}>
          <p>Internet Provider: <span>{this.props.isp}</span></p>
        </div>

      </div>
    );
  }
}

AboutForm.contextTypes = {
  router: React.PropTypes.object
}

AboutForm.propTypes = {
  busy: React.PropTypes.bool.isRequired,
  test: React.PropTypes.object.isRequired
}

AboutForm.defaultProps = {
  busy: false
}

export default AboutForm;
