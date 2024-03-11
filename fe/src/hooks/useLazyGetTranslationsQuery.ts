import { useEffect, useMemo, useState } from 'react';
import debounce from 'debounce';
import axios, { type AxiosResponse } from 'axios';

const url = `${import.meta.env.VITE_SERVER_API_URL}/search`;

interface IUseGetTranslationsQueryReturn<T, R> {
  isLoading: boolean;
  isError: boolean;
  data: R;
  load: (value: T) => void;
}

const useGetTranslationsQuery = <T, R>(value: T): IUseGetTranslationsQueryReturn<T, R> => {
  const [data, setData] = useState<R | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const load = useMemo(
    () =>
      debounce((value: T) => {
        setIsError(false);
        if (!value) {
          setData(undefined);
          return;
        }
        setIsLoading(true);
        axios
          .get(url, { params: { word: value } })
          .then((response: AxiosResponse<R>) => {
            setData(response.data);
          })
          .catch(() => {
            setIsError(true);
            setData(undefined);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 1500),
    [],
  );

  useEffect(() => load(value), [value]);

  return { isLoading, isError, data, load };
};

export default useGetTranslationsQuery;
