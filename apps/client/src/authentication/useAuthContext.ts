import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Auth } from './types';

/**
 * @desc hook to access authcontext methods
 * @return {authContextInstance}
 */
function useAuthContext(): Auth {
  const authContextInstance = useContext(AuthContext);

  if (!authContextInstance) {
    throw new Error('Using AuthContext outside <AuthProvider></AuthProvider>');
  }
  return authContextInstance;
}

export default useAuthContext;
