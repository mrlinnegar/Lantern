import React, { Component } from 'react';
import './App.css';
import Light from './Light';

class App extends Component {

  state = {lights:[]}

  componentDidMount() {
    fetch('/lights/all')
      .then(res => res.json())
      .then(lights => this.setState({ lights }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Lights</h2>
        </div>
        <div className="App-intro">
          {this.state.lights.map(light =>
            <Light
              key={light.id}
              id={light.id}
              color={light.color}
              status={light.status}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
