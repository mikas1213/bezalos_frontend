import { useOutletContext } from 'react-router-dom';

import type { ProfilisOutletContext } from '../types';

/** Tipizuotas `useOutletContext` profilio puslapiams, kad nereikėtų kartoti generiko. */
export const useProfilisContext = () => useOutletContext<ProfilisOutletContext>();
