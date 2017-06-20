import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: (props: ProductCardProps) => JSX.Element = (props: ProductCardProps): JSX.Element => (
  <Card key={props.product.name}>
    <CardHeader
      title={props.product.name}
      subtitle={`${props.product.price} €`}
    />
    <CardText>{props.product.description}</CardText>
  </Card>
);

export default ProductCard;
