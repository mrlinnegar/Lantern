import React, { Component } from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AvailableLights from './containers/AvailableLights'
import AppHeader from './components/AppHeader';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <AppHeader />
            <AvailableLights />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
