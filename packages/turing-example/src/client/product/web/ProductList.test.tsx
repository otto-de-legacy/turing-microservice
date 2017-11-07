import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import ProductList from './ProductList';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  shallow(<ProductList/>);
});
