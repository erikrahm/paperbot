import { useRef, useEffect } from 'react';

export const usePrevious = (value: string) => { 
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as string;
}

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
