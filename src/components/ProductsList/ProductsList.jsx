import { ProductItem } from '../ProductItem/ProductItem';

export const ProductsList = ({ products }) =>
  products.map(product => (
    <ProductItem
      key={product.id}
      product={product}
      user={product.user}
      category={product.category}
    />
  ));
