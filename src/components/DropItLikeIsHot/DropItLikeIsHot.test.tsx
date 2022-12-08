import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DropItLikeIsHot } from './DropItLikeIsHot';

describe('DropItLikeIsHot', () => {
  it('should render', () => {
    render(
      <DropItLikeIsHot
        value="test"
        onChange={() => {}}
        onSelect={() => {}}
        optionsCallback={() => Promise.resolve([])}
      />,
    );

    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should show loading', () => {
    render(
      <DropItLikeIsHot
        value="test"
        onChange={() => {}}
        onSelect={() => {}}
        optionsCallback={() =>
          Promise.resolve([
            {
              id: '1',
              label: 'option1',
            },
          ])
        }
      />,
    );

    const input = screen.getByDisplayValue('test');

    fireEvent.change(input, { currentTarget: { value: 'o' } });
    fireEvent.focus(input);

    expect(screen.getAllByText('.').length).toBe(3);
  });
});
