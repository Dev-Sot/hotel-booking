import { useState, useCallback } from "react";

interface UseFetchOptions<T> {
  onSuccess?: (data?: T) => void;
  onError?: (error: string) => void;
}

/**
 * Hook genérico para llamadas fetch
 */
export function useFetch<T>(
  fetcher: () => Promise<{ success: boolean; data?: T; error?: string }>,
  options?: UseFetchOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (result.success) {
        setData(result.data || null);
        options?.onSuccess?.(result.data);
      } else {
        const errorMsg = result.error || "Error desconocido";
        setError(errorMsg);
        options?.onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      options?.onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [fetcher, options]);

  return { data, loading, error, execute };
}
