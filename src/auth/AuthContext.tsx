import { createContext } from 'react';
import type { AuthContextType } from '../types/common';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
