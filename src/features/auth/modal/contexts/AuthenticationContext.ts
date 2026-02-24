import { createContext } from "react";

import type { AuthenticationContextValue } from "./authentication.types";
export const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);
