require('./style/main');

import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import TalkDatePicker from './component/TalkDatePicker';
import TopAppBar from './component/TopAppBar';

injectTapEventPlugin();

ReactDOM.render(<div><TopAppBar /><TalkDatePicker /></div>, document.getElementById('app'));
