import * as React from 'react';
import {shallow} from 'enzyme';
import ProductCard from './ProductCard';

it('renders without crashing', () => {
  const product: Product = {
    name: 'test',
    description: 'test',
    price: '2,50'
  };
  shallow(<ProductCard product={product} />);
});
