import { useState, useCallback } from 'react';

const useStateMerge = <T extends object>(
  initialState?: T
): [Partial<T>, (newState: Partial<T>) => void] => {
  const [state, setState] = useState<Partial<T>>(initialState || {});

  const mergeState = useCallback((newState: Partial<T>) => {
    console.log('state', newState);
    if (newState) {
      setState((prev): Partial<T> => ({ ...prev, ...newState }));
    }
  }, []);

  return [state, mergeState];
};

export default useStateMerge;
