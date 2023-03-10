import classNames from 'classnames';
import React from 'react';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  query: string;
  changeQuery: (value: string) => void;
};

export const SearchBar: React.FC<Props> = ({ query, changeQuery }) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    changeQuery(event.target.value);

  return (
    <form className={styles.search} onSubmit={onFormSubmit}>
      <label className={styles.search__container}>
        <Icon
          icon="search"
          className={classNames(
            styles.search__icon,
            styles[`search__icon-gray`]
          )}
        />

        <input
          className={styles.search__text}
          type="text"
          value={query}
          onChange={onQueryInput}
          placeholder="Search for products"
        />
      </label>
    </form>
  );
};
