import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProductTile from './components/ProductTile';
import './App.css';

const App: () => JSX.Element = (): JSX.Element => (
  <div styleName="app">
    <div styleName="header">
      <h2>Welcome to React</h2>
    </div>
    <p styleName="intro">
      To get started, edit <code>src/client/App.js</code> and save to reload.
    </p>
    <MuiThemeProvider>
      <ProductTile />
    </MuiThemeProvider>
  </div>
);

export default App;
