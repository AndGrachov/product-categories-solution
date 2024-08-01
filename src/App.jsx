/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { ProductsList } from './components/ProductsList/ProductsList';
import { UsersList } from './components/UsersList/UsersList';
import { InputFilter } from './components/InputFilter/InputFilter';
import { CategoriesList } from './components/CategoriesList/CategoriesList';

function getCategoryById(categories, categoryId) {
  return categories.find(category => category.id === categoryId);
}

function getUserByOwnerId(users, ownerId) {
  return users.find(user => user.id === ownerId);
}

function getPreparedOwners(users) {
  return [{ id: 0, name: 'All' }, ...users];
}

function getPreparedCategories(categories) {
  return [{ id: 0, title: 'All' }, ...categories];
}

function getPreparedProducts(
  initialProducts,
  { owner: ownerId, query, activeCategory },
) {
  let preparedProducts = [];

  if (ownerId === 0) {
    preparedProducts = initialProducts;
  } else {
    preparedProducts = initialProducts.filter(
      product => product.user.id === ownerId,
    );
  }

  if (query) {
    preparedProducts = preparedProducts.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase().trim());
    });
  }

  if (activeCategory) {
    preparedProducts = preparedProducts.filter(product => {
      return product.category.id === activeCategory;
    });
  }

  return preparedProducts;
}

const products = productsFromServer.map(product => {
  const category = getCategoryById(categoriesFromServer, product.categoryId);
  const user = getUserByOwnerId(usersFromServer, category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const owners = getPreparedOwners(usersFromServer);
  const categories = getPreparedCategories(categoriesFromServer);
  const [owner, setOwner] = useState(owners[0].id);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [query, setQuery] = useState('');
  const preparedProducts = getPreparedProducts(products, {
    owner,
    query,
    activeCategory,
  });

  function resetFilters() {
    setOwner(owners[0].id);
    setQuery('');
    setActiveCategory(categories[0].id);
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <UsersList users={owners} activeUser={owner} setUser={setOwner} />
            </p>

            <div className="panel-block">
              <InputFilter value={query} setValue={setQuery} />
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <CategoriesList
                categories={categories}
                activeCategory={activeCategory}
                setCategory={setActiveCategory}
              />
              {/* <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {preparedProducts.length ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <ProductsList products={preparedProducts} />
              </tbody>
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
