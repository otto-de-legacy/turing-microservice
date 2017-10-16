import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import ProductCard from './ProductCard';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const product: Product = {
    name: 'test',
    description: 'test',
    price: '2,50'
  };
  shallow(<ProductCard product={product} />);
});
