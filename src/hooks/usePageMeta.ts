import { useEffect } from 'react';

interface PageMeta {
	title?: string;
	/** `document.body` fono spalva puslapio gyvavimo metu. */
	background?: string;
}

/**
 * Nustato `document.title` ir body foną, o puslapį paliekant atstato ankstesnes reikšmes.
 * Pakeičia tą patį `useEffect`, kuris kartojasi keliuose puslapiuose.
 */
export const usePageMeta = ({ title, background }: PageMeta) => {
	useEffect(() => {
		const previousTitle = document.title;
		const previousBackground = document.body.style.backgroundColor;

		if (title) document.title = title;
		if (background) document.body.style.backgroundColor = background;

		return () => {
			if (title) document.title = previousTitle;
			if (background) document.body.style.backgroundColor = previousBackground;
		};
	}, [title, background]);
};
