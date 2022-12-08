import './DropItLikeIsHot.css';

import { ChangeEvent, FocusEvent, useCallback, useMemo, useState } from 'react';

import { Options } from './DropItLikeIsHotTypes';
import { debounceCallBackOptions } from './DropItLikeIsHotUtils';
import { Field } from './Field/Field';
import { Flyout } from './Flyout/Flyout';
import { Loading } from './Loading/Loading';

export interface IDropItLikeIsHot {
  value: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (id: string, label: string) => void;
  optionsCallback: (searchString: string) => Promise<Options>;
}

export const DropItLikeIsHot = ({
  value,
  label,
  className,
  placeholder,
  onChange,
  optionsCallback,
  onSelect,
}: IDropItLikeIsHot) => {
  const [options, setOptions] = useState<Options>([]);
  const [loading, setLoading] = useState(false);
  const [openedFlyout, setOpenedFlyout] = useState(true);

  const optionsCallbackDebounced = useMemo(() => debounceCallBackOptions(optionsCallback), []);

  const handleCallBackOptions = useCallback((searchString: string) => {
    setLoading(true);
    optionsCallbackDebounced(searchString)
      .then((options) => {
        setOptions(options);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpenFlyout = useCallback(() => {
    if (value) {
      handleCallBackOptions(value);
    }
    setOpenedFlyout(true);
  }, [value]);

  const handleCloseFlyout = useCallback(() => {
    setOpenedFlyout(false);
  }, []);

  const handleClickOutside = useCallback((event: FocusEvent<HTMLInputElement>) => {
    if (
      !(event.relatedTarget && [...event.relatedTarget.classList].includes('dilih__flyout__item'))
    ) {
      handleCloseFlyout();
    }
  }, []);

  return (
    <div className={'dilih' + (className ? ` className` : '')}>
      {label && <label className="dilih__label">{label}</label>}
      <Field
        value={value}
        onChange={(value, event) => {
          onChange(value, event);
          handleCallBackOptions(value);
        }}
        onFocus={handleOpenFlyout}
        onBlur={handleClickOutside}
        placeholder={placeholder}
      />
      {openedFlyout && options.length && !loading ? (
        <Flyout
          searchValue={value}
          options={options}
          onSelect={(...args) => {
            onSelect(...args);
            handleCloseFlyout();
          }}
          onCloseFlyout={handleCloseFlyout}
        />
      ) : null}
      {loading && <Loading />}
    </div>
  );
};
