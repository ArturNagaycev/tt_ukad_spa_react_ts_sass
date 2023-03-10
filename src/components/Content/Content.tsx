import React from 'react';
import { Slider } from '../Slider';
import { ProductsPage } from '../ProductsPage';
import { NotFountPage } from '../NotFoundPage';
import { ProductInfo } from '../ProductInfo';
import styles from './Content.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Content: React.FC = () => (
  <main className={styles.content}>
    <div className={styles.content__wrapper}>
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </div>
  </main>
);
