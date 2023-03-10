import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { getPages } from '../../utils/getPages';
import { scrollUp } from '../../utils/scrollUp';
import Icon from '../Icon/Icon';
import styles from './Pagination.module.scss';

const TOTAL_PAGES_NUMBER = 18;

type Props = {
  isSearchedProducts: boolean;
  initialPage: number;
};

export const Pagination: React.FC<Props> = ({
  isSearchedProducts,
  initialPage,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useAppSelector((state) => state.products);

  const totalPagesNumber = useMemo(() => {
    return isSearchedProducts
      ? Math.ceil(products.length / 10)
      : TOTAL_PAGES_NUMBER;
  }, [products]);

  const onPaginationClick = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    if (isSearchedProducts) {
      scrollUp();
    }
  };

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => onPaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon icon="chevron-thin-left" className={styles.pagination__icon} />
        </button>
      </li>

      {getPages(totalPagesNumber).map((page, index) => (
        <li className={styles.pagination__item} key={index}>
          <button
            className={classNames(styles.pagination__button, {
              [styles['pagination__button--active']]: page === currentPage,
            })}
            onClick={() => onPaginationClick(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={styles.pagination__item}>
        <button
          className={styles.pagination__button}
          onClick={() => onPaginationClick(currentPage + 1)}
          disabled={currentPage === totalPagesNumber}
        >
          <Icon icon="chevron-thin-right" className={styles.pagination__icon} />
        </button>
      </li>
    </ul>
  );
};
