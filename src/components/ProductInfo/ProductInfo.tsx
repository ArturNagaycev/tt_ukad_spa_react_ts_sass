import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PLACEHOLDER_URL } from '../../constants/constants';
import { fetchProductById } from '../../features/productSlice';
import { Loader } from '../Loader';
import styles from './ProductInfo.module.scss';

export const ProductInfo: React.FC = () => {
  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { product, isLoading, error } = useAppSelector(
    (state) => state.product
  );

  const propertiesData = [
    {
      name: 'Weight (imperial)',
      value: product?.weight?.imperial,
    },
    {
      name: 'Weight (metric)',
      value: product?.weight?.metric,
    },
    {
      name: 'Height (imperial)',
      value: product?.height?.imperial,
    },
    {
      name: 'Height (metric)',
      value: product?.height?.metric,
    },
    {
      name: 'Bred for',
      value: product?.bred_for,
    },
    {
      name: 'Breed group',
      value: product?.breed_group,
    },
    {
      name: 'Life span',
      value: product?.life_span,
    },
    {
      name: 'Temperament',
      value: product?.temperament,
    },
    {
      name: 'Origin',
      value: product?.origin,
    },
  ];

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, []);

  return (
    <section className={styles.info}>
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <Link className={styles.info__link} to={'/products'}>
            {'<<< Back to products list'}
          </Link>
          <h2 className={styles.info__title}>{product?.name}</h2>

          <div className={styles.info__content}>
            <div className={styles['info__image-container']}>
              <img
                src={product?.image?.url ?? PLACEHOLDER_URL}
                alt={product?.name}
                className={styles.info__image}
              />
            </div>

            <div className={styles.info__description}>
              <h5 className={styles['info__description-title']}>
                Characteristics
              </h5>

              <ul className={styles.info__properties}>
                {propertiesData.map((property, index) => (
                  <li className={styles.info__property} key={index}>
                    <span>{property.name}</span>
                    <span className={styles['info__property-value']}>
                      {property.value || '-'}
                    </span>
                  </li>
                ))}
              </ul>

              {product?.description && (
                <>
                  <h5 className={styles['info__description-title']}>
                    Description
                  </h5>

                  <p>{product.description}</p>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {!isLoading && error && <p className={styles.info__title}>{error}</p>}
    </section>
  );
};
