import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import MyAwesomeReactComponent from './myAwesomeReactComponent';

injectTapEventPlugin();

ReactDOM.render(<MyAwesomeReactComponent />, document.body);
