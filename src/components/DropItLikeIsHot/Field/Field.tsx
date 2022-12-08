import './Field.css';

import { ChangeEvent, FocusEvent } from 'react';

interface IField {
  value: string;
  placeholder?: string;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export const Field = ({ value, placeholder, onChange, onFocus, onBlur }: IField) => {
  return (
    <div className="dilih__field">
      <input
        className="dilih__field__input"
        placeholder={placeholder}
        onChange={(event) => onChange(event.currentTarget.value, event)}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
