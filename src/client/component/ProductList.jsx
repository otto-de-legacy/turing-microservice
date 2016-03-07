import React from 'react';
import $ from 'jquery';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class ProductList extends React.Component {

  constructor() {
    super();
    this.state = {products: []};
  }

  loadProducts() {
    $.getJSON('api/products/', (products) => {
      this.setState({
        products
      });
    });
  }

  componentDidMount() {
    this.loadProducts();
  }

  createCard(product) {
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

  render() {
    return (
      <div>
        {this.state.products.map(this.createCard)}
      </div>
    );
  }
}

export default ProductList;
