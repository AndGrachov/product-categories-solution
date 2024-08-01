import { Category } from '../Category/Category';

export const CategoriesList = ({ categories, activeCategory, setCategory }) => {
  return categories.map(category => (
    <Category
      key={category.id}
      category={category}
      activeCategory={activeCategory}
      setCategory={setCategory}
    />
  ));
};
