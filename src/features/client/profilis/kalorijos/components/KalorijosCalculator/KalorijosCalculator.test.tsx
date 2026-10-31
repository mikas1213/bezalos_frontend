import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { KalorijosCalculator } from './KalorijosCalculator';

const renderCalculator = () => {
	const user = userEvent.setup();
	render(
		<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<KalorijosCalculator />
		</MemoryRouter>,
	);
	return user;
};

const fill = async (user: UserEvent, { age, height, weight }: { age: string; height: string; weight: string }) => {
	await user.type(screen.getByLabelText('Amžius'), age);
	await user.type(screen.getByLabelText('Ūgis'), height);
	await user.type(screen.getByLabelText('Svoris'), weight);
};

const selectActivity = async (user: UserEvent, title: string) => {
	await user.click(screen.getByRole('button', { name: 'Aktyvumas' }));
	await user.click(screen.getByRole('button', { name: (name) => name.startsWith(title) }));
};

const expectResult = (kcal: number, minKcal: number) => {
	expect(screen.getByText(/Dienos energijos poreikis/)).toHaveTextContent(
		`Dienos energijos poreikis ${kcal} kcal. Mažiausias rekomenduojamas kalorijų kiekis ${minKcal} kcal.`,
	);
};

describe('KalorijosCalculator', () => {
	it('aktyvumas didina dienos poreikį, bet ne mažiausią kiekį', async () => {
		const user = renderCalculator();
		await fill(user, { age: '30', height: '165', weight: '60' });
		expectResult(1384, 1384);

		await selectActivity(user, 'Vidutinis aktyvumas');
		expectResult(2145, 1384);
	});

	it('perjungus lytį skaičiuojama pagal vyrų formulę', async () => {
		const user = renderCalculator();
		await fill(user, { age: '30', height: '165', weight: '60' });
		await user.click(screen.getByRole('radio', { name: 'Vyras' }));
		expectResult(1514, 1514);
	});

	it('kablelis pakeičiamas tašku ir skaičiuojama teisingai', async () => {
		const user = renderCalculator();
		await fill(user, { age: '30', height: '165', weight: '60,5' });
		expect(screen.getByLabelText('Svoris')).toHaveValue('60.5');
		expectResult(1388, 1388);
	});
});
