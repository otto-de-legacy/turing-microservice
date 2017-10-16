import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  shallow(<App/>);
});
