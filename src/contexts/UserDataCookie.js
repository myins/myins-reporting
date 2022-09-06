import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { setBearerToken } from '../services/api';

export default function useUserDataCookie() {
  const [userDataCookie, setUserDataCookie, removeUserDataCookie] = useCookies(['user']);
  const isSetBearer = useRef(false)

  useEffect(() => {
    if (userDataCookie.user && !isSetBearer.current) {
      isSetBearer.current = true
      setBearerToken(userDataCookie.user)
    }
  }, [isSetBearer, userDataCookie.user])

  return {
    userDataCookie,
    setUserDataCookie,
    removeUserDataCookie,
  };
}
