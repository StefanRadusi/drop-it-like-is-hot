import './Flyout.css';

import { useEffect, useRef, useState } from 'react';

import { Options } from '../DropItLikeIsHotTypes';
import { FlyoutItem } from './FlyoutItem/FlyoutItem';

interface IFlyout {
  options: Options;
  searchValue: string;
  onSelect: (id: string, label: string) => void;
  onCloseFlyout: () => void;
}

const MAX_NUM_OF_ITEMS = 12;

const isElementInViewport = (el: HTMLUListElement) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

export const Flyout = ({ options, searchValue, onSelect }: IFlyout) => {
  const [numOfItems, setNumOfItems] = useState(MAX_NUM_OF_ITEMS);
  const [positionAbove, setPositionAbove] = useState(false);
  const refContainer = useRef<HTMLUListElement>(null);
  const refLastItem = useRef<HTMLLIElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // guard against a large number of items
  // create li react elements only when scrolling to bottom of the flyout
  useEffect(() => {
    if (!observer.current)
      observer.current = new IntersectionObserver(
        (entries) => {
          const [lastItem] = entries;
          if (lastItem.isIntersecting && refLastItem.current) {
            observer.current?.unobserve(refLastItem.current);
            setNumOfItems(numOfItems + MAX_NUM_OF_ITEMS);
          }
        },
        {
          root: refContainer.current,
        },
      );

    if (refLastItem.current) observer.current.observe(refLastItem.current);
  }, [numOfItems]);

  // guard against flyout out of viewport
  useEffect(() => {
    if (refContainer.current && !isElementInViewport(refContainer.current)) {
      setPositionAbove(true);
    } else {
      setPositionAbove(false);
    }
  }, [options.length]);

  return (
    <ul
      className={'dilih__flyout' + (positionAbove ? ' dilih__flyout--position-above' : '')}
      ref={refContainer}
    >
      {options.slice(0, numOfItems).map(({ id, label }, index) => (
        <FlyoutItem
          key={id}
          id={id}
          label={label}
          searchValue={searchValue}
          onClick={onSelect}
          ref={index === numOfItems - 1 ? refLastItem : undefined}
        />
      ))}
    </ul>
  );
};
