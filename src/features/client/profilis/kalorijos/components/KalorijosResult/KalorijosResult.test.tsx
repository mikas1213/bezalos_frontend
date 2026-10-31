import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { KalorijosResult } from './KalorijosResult';

// Skaitliukai animuojami; testuose iškart rodoma galutinė (suapvalinta) reikšmė.
vi.mock('../../../components/AnimatedNumber', () => ({
	AnimatedNumber: ({ value }: { value: number }) => Math.round(value),
}));

describe('KalorijosResult', () => {
	// Ekrano skaitytuvo tekstas tikrinamas KalorijosCalculator teste; matomi skaitliukai reikšmes gauna atskirai.
	it('rodo dienos poreikį, mažiausią kiekį ir makroelementų gramus', () => {
		render(<KalorijosResult kcal={2144.70865} minKcal={1383.683} />);
		expect(screen.getByText('2145')).toBeInTheDocument();
		expect(screen.getByText('1384 kcal')).toBeInTheDocument();
		for (const grams of ['107', '241', '83']) {
			expect(screen.getByText(grams)).toBeInTheDocument();
		}
	});
});
