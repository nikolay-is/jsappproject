import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className='header-div col-sm-12'>
        <div className='nav-links col-sm-9'>
          { this.props.children }
        </div>
        <div className='col-sm-3 greeter'>
          {
            this.props.isLoggedIn && <span>Welcome, { this.props.currentUser }</span>
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.string.isRequired,
  children: React.PropTypes.array
}

Header.defaultProps = {
  isLoggedIn: false,
  currentUser: '',
  children: {}
}

export default Header;
