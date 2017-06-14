import React, {Component} from 'react';
import $ from 'jquery';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {products: []};
  }

  static createCard(product) {
    return (
      <Card key={product.name}>
        <CardHeader
          title={product.name}
          subtitle={`${product.price} €`}
        />
        <CardText>{product.description}</CardText>
      </Card>
    );
  }

  loadProducts() {
    $.getJSON('/turing-example/api/products/', (products) => {
      this.setState({
        products
      });
    });
  }

  componentDidMount() {
    this.loadProducts();
  }

  render() {
    return (
      <div>
        {this.state.products.map(ProductList.createCard)}
      </div>
    );
  }
}

export default ProductList;
