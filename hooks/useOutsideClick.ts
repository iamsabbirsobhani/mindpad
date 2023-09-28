import { useEffect } from 'react';

export const useOutsideClick = (
  callback: () => void,
  ref: React.RefObject<HTMLElement>,
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
