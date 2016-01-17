import './style/main.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import TalkDatePicker from './component/TalkDatePicker';
import TopAppBar from './component/TopAppBar';

injectTapEventPlugin();

let root = document.getElementById('app');
if (!root) {
  root = document.body;
}

ReactDOM.render(<div><TopAppBar /><TalkDatePicker /></div>, root);
