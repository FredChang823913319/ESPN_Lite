import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    // console.log(isSignedIn);
    if (isSignedIn) {
      return (
        <nav style={{padding: 10, display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f5 grow no-underline br-pill ba ph2 pv3 mb3 dib black'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{padding: 10, display: 'flex', justifyContent: 'flex-end'}}>
          <p style={{margin: 20}} onClick={() => onRouteChange('signin')} className='f5 grow no-underline br-pill ba ph2 pv3 mb3 dib black'>Sign In</p>
          <p style={{margin: 20}} onClick={() => onRouteChange('register')} className='f5 grow no-underline br-pill ba ph2 pv3 mb3 dib black'>Register</p>
        </nav>
      );
    }
}

export default Navigation;