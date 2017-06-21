/* tslint:disable:no-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {AppContainer} from 'react-hot-loader';
import App from './App';
import './index.css';

const render = (Component: any): void => {
  const root = (
    <AppContainer>
      <Component />
    </AppContainer>
  );
  ReactDOM.render(root, document.getElementById('root'));
};

injectTapEventPlugin();
render(App);

declare const module: any;
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
