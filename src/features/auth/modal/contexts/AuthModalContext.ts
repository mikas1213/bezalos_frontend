import { createContext } from "react";

import type { AuthModalContextValue } from "./authModal.types";

export const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);
