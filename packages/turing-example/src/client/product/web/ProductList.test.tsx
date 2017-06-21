import * as React from 'react';
import {shallow} from 'enzyme';
import ProductList from './ProductList';

it('renders without crashing', () => {
  shallow(<ProductList/>);
});
