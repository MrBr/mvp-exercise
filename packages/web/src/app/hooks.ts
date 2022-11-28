import { useCallback, useState } from "react";

type Request<T extends any[], U> = (...args: T) => Promise<U>;

interface ApiState<T extends Request<any, any>> {
  response: (T extends Request<any, infer K> ? K : never) | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T extends Request<any, any>>(request: T) => {
  const [apiRequestState, setApiRequestState] = useState<ApiState<T>>({
    loading: false,
    error: null,
    response: null,
  });

  const fetch = useCallback(
    async (...args: Parameters<T>) => {
      setApiRequestState({
        loading: true,
        error: null,
        response: null,
      });
      try {
        const response = await request(...args);
        setApiRequestState({
          loading: false,
          error: response.error,
          response: !response.error && response,
        });
      } catch (e) {
        setApiRequestState({
          loading: false,
          error: (e as Error).message,
          response: null,
        });
      }
    },
    [request, setApiRequestState]
  );

  const reset = useCallback(() => {
    setApiRequestState({
      response: null,
      loading: false,
      error: null,
    });
  }, [setApiRequestState]);

  return { fetch, ...apiRequestState, reset };
};
