import React, { useEffect } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './Slider.module.scss';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/css/navigation';
import { PLACEHOLDER_URL } from '../../constants/constants';

export const Slider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className={styles.slider}>
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <h2 className={styles.slider__title}>Home Page</h2>

          <Swiper
            className={styles.slider__items}
            spaceBetween={34}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {products.slice(0, 8).map((product) => {
              const { id, image, breed_group, name } = product;

              return (
                <SwiperSlide className={styles.slider__item} key={id}>
                  <ProductCard
                    id={id}
                    imageUrl={image?.url ?? PLACEHOLDER_URL}
                    category={breed_group || 'No category'}
                    title={name}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}

      {!isLoading && error && <p className={styles.slider__title}>{error}</p>}
    </section>
  );
};
