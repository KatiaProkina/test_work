import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedUsername, setDebouncedUsername] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedUsername;
}

export default useDebounce;
