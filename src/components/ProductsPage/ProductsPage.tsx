import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './ProductsPage.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { ProductsList } from '../ProductsList';
import { debounce } from '../../utils/debounce';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const [isQueryNew, setIsQueryNew] = useState(true);
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialQuery = searchParams.get('search') || '';
  const isSearchedProducts = Boolean(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const setQueryToApply = (value: string) => {
    searchParams.set('page', String(1));

    if (!value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', String(value));
    }

    setIsQueryNew(true);
    setSearchParams(searchParams);
  };
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);
  const changeQuery = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  useEffect(() => {
    if (!initialQuery) {
      setQuery('');
      dispatch(fetchProducts({ page: initialPage }));
    }

    if (initialQuery && isQueryNew) {
      dispatch(fetchProducts({ query: initialQuery }));
      setIsQueryNew(false);
    }
  }, [initialQuery, initialPage]);

  return (
    <section className={styles.products}>
      <div className={styles.products__heading}>
        <h2 className={styles.products__title}>Product Page</h2>

        <SearchBar query={query} changeQuery={changeQuery} />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <ProductsList
            isSearchedProducts={isSearchedProducts}
            page={initialPage}
          />
          <Pagination
            isSearchedProducts={isSearchedProducts}
            initialPage={initialPage}
          />
        </>
      )}

      {!isLoading && !error && !products.length && (
        <p className={styles.products__title}>
          {'There are no products with your request:'}
          <br />
          {`Page number - "${initialPage}"`}
          <br />
          {`Search word - "${initialQuery}"`}
        </p>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
