import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import '@testing-library/jest-dom/vitest';

// Be `globals: true` Testing Library pati neišvalo DOM po kiekvieno testo.
afterEach(() => {
	cleanup();
});
