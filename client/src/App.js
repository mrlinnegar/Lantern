import React, { Component } from 'react';
import createMuiTheme from 'material-ui/styles/theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AvailableLights from './containers/AvailableLights'
import AppHeader from './components/AppHeader';

class App extends Component {

  render() {

    const theme = createMuiTheme();

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
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
