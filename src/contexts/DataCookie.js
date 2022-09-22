import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { setBearerToken } from '../services/api';

export default function useDataCookie() {
  const [dataCookie, setDataCookie, removeDataCookie] = useCookies([]);
  const isSetBearer = useRef(false)

  useEffect(() => {
    if (dataCookie.user && !isSetBearer.current) {
      isSetBearer.current = true
      setBearerToken(dataCookie.user)
    }
  }, [dataCookie.user])

  return {
    dataCookie,
    setDataCookie,
    removeDataCookie,
  };
}
