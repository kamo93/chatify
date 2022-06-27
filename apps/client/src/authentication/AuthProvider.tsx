import React, { ReactNode, useState } from 'react';
import AuthContext from './AuthContext';
import { User } from './types';

type AutoProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AutoProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
