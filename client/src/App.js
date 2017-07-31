import React, { Component } from 'react';
import './App.css';

import AvailableLights from './containers/AvailableLights'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <AvailableLights />
        </div>
      </div>
    );
  }
}

export default App;
