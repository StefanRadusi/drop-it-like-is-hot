import { Options } from './DropItLikeIsHotTypes';

const DEBOUNCE_DELAY = 200;

// debounce api calls when user types fast
export const debounceCallBackOptions = (func: (searchString: string) => Promise<Options>) => {
  let inDebounce: NodeJS.Timeout;

  return (searchString: string) => {
    clearTimeout(inDebounce);
    return new Promise<Options>((res, rej) => {
      inDebounce = setTimeout(
        () => {
          if (searchString) {
            return func(searchString)
              .then((data) => res(data))
              .catch((err) => rej(err));
          } else {
            res([]);
          }
        },

        DEBOUNCE_DELAY,
      );
    });
  };
};
