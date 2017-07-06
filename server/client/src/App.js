import React, { Component } from 'react';
import './App.css';
import Light from './Light';

class App extends Component {

  state = {lights:[]}

  componentDidMount() {
    fetch('/api/lights')
      .then(res => res.json())
      .then(lights => this.setState({ lights }))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Something</h2>
        </div>
        <div className="App-intro">
          {this.state.lights.map(light =>
            <Light
              key={light.id}
              id={light.id}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
