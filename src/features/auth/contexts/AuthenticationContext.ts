import { createContext } from 'react';
import type { AuthenticationContextValue } from './types';
export const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);
