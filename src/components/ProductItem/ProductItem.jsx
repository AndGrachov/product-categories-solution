import cn from 'classnames';

export const ProductItem = ({ product, user, category }) => (
  <tr data-cy="Product">
    <td className="has-text-weight-bold" data-cy="ProductId">
      {product.id}
    </td>

    <td data-cy="ProductName">{product.name}</td>
    <td data-cy="ProductCategory">
      <span>{category.icon}</span> - {category.title}
    </td>

    <td
      data-cy="ProductUser"
      className={cn({
        'has-text-link': user.sex === 'm',
        'has-text-danger': user.sex === 'f',
      })}
    >
      {user.name}
    </td>
  </tr>
);
