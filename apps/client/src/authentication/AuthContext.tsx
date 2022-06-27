/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Auth } from './types';

const AuthContext = React.createContext<Auth | null>(null);

export default AuthContext;
