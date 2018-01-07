import * as React from 'react';
import ProductCard from './ProductCard';

interface ProductListState {
  products: Product[];
}

class ProductList extends React.Component<{}, ProductListState> {
  public constructor(props: {}, context: {}) {
    super(props, context);
    this.state = {products: []};
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.products.map((product: Product) => <ProductCard key={product.name} product={product} />)}
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
