import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ITEMS_PER_PAGE, PLACEHOLDER_URL } from '../../constants/constants';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  isSearchedProducts: boolean;
  page: number;
};

export const ProductsList: React.FC<Props> = ({ isSearchedProducts, page }) => {
  const { products } = useAppSelector((state) => state.products);

  const visibleProducts = useMemo(() => {
    return isSearchedProducts
      ? products.slice(
          page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        )
      : products;
  }, [page]);

  return (
    <ul className={styles['products-list']}>
      {visibleProducts.map((product) => {
        const { id, image, breed_group, name } = product;

        return (
          <div className={styles['products-list__product']} key={id}>
            <ProductCard
              id={id}
              imageUrl={image?.url ?? PLACEHOLDER_URL}
              category={breed_group || 'Unknown breed'}
              title={name}
            />
          </div>
        );
      })}
    </ul>
  );
};
