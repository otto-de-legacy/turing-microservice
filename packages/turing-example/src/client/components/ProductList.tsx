import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

interface Product {
  name: string;
  description: string;
  price: string;
}

interface ProductListState {
  products: Product[];
}

class ProductList extends React.Component<{}, ProductListState> {
  private static createCard(product: Product): JSX.Element {
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

  public constructor() {
    super();
    this.state = {products: []};
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.products.map(ProductList.createCard)}
      </div>
    );
  }

  public componentDidMount(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    fetch('/turing-example/api/products/')
      .then((response: Body) => response.json())
      .then((products: Product[]) => {
        this.setState({products});
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}

export default ProductList;
