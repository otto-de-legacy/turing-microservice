import './style/main.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './component/ProductList';

injectTapEventPlugin();

let root = document.getElementById('app');
if (!root) {
  root = document.body;
}

ReactDOM.render(<ProductList />, root);
