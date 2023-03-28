/* eslint-disable import/prefer-default-export */
import { useState, useCallback, useMemo } from "react";
import type { Error } from "../trpc";

export function useSafeQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const safeQuery = useCallback(async <T>(callback: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await callback();
      return result;
    } catch ({ shape }) {
      setError(shape as Error);
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  const clearQuery = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return useMemo(
    () => ({ loading, error, safeQuery, clearQuery }),
    [loading, error, safeQuery, clearQuery]
  );
}
