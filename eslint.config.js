import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'simple-import-sort': simpleImportSort,
		},

		settings: {
			react: { version: '18.2' },
		},

		rules: {
			// React
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,

			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/prop-types': 'off',
			'react/button-has-type': 'warn',

			// 🔥 Import sorting
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^react', '^react-dom'],
						['^@?\\w'],
						['^@/'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'],
						['^.+\\.?(scss|css)$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
		},
	},

	{
		ignores: ['dist'],
	},
];
