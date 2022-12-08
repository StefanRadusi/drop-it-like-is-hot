import './FlyoutItem.css';

import React, { ForwardedRef } from 'react';

interface IFlyoutItem {
  id: string;
  label: string;
  searchValue: string;
  onClick: (id: string, label: string) => void;
}

const getSearchValueOuterChars = (value: string, searchValue: string) => {
  const regex = new RegExp(`^(?<prefix>.*?)(?<match>${searchValue})(?<suffix>.*?)$`, 'i');

  const { prefix, match, suffix } = regex.exec(value)?.groups || {};

  return {
    prefix,
    match,
    suffix,
  };
};

export const FlyoutItem = React.forwardRef(
  ({ id, label, searchValue, onClick }: IFlyoutItem, ref: ForwardedRef<HTMLLIElement>) => {
    const { prefix, match, suffix } = getSearchValueOuterChars(label, searchValue);

    return (
      <li
        className="dilih__flyout__item"
        tabIndex={-1}
        onClick={(event) => {
          event.preventDefault();
          onClick(id, label);
        }}
        ref={ref}
      >
        {prefix}
        <span className="dilih__flyout__item__highlighted-text">{match}</span>
        {suffix}
      </li>
    );
  },
);
