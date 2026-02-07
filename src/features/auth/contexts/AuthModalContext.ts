import { createContext } from 'react';
import type { AuthModalContextValue } from './types';

export const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);
