import { createContext } from 'react';
import type { AuthContextType } from '../config/interfaces';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
