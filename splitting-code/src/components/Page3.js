import React from 'react';
import logo from '../logo.svg';

const Page3 = ({ onRouteChange }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <button className="button" onClick={() => onRouteChange('page1')}>
      Page 1
    </button>
    <button className="button" onClick={() => onRouteChange('page2')}>
      Page 2
    </button>
    <button className="button disabled" onClick={() => onRouteChange('page3')}>
      Page 3
    </button>
  </div>
);
export default Page3;
