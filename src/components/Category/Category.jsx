import cn from 'classnames';

export const Category = ({ category, activeCategory, setCategory }) => (
  <a
    data-cy="Category"
    className={cn('button mr-2 my-1', {
      'is-info': category.id === activeCategory,
    })}
    href="#/"
    onClick={() => setCategory(category.id)}
  >
    {category.title}
  </a>
);
