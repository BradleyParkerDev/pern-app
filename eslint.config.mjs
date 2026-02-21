import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
	// ✅ 1. Shared base config (server + client)
	{
		files: ['app/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
		ignores: ['**/dist/**', 'node_modules', 'logs'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: [
					'./tsconfig.json', // root
					'./app/tsconfig.json', // server project
					'./app/client/tsconfig.json', // client project
				],
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin,
			import: importPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,

			// ✅ Formatting
			'prettier/prettier': [
				'error',
				{
					tabWidth: 4,
					useTabs: true,
					semi: true,
					singleQuote: true,
				},
			],

			// ✅ TypeScript style
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'off',

			// ✅ Import handling
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					js: 'never',
					ts: 'never',
					jsx: 'never',
					tsx: 'never',
				},
			],
			'import/no-unresolved': 'off',
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: [
						'./tsconfig.json',
						'./app/tsconfig.json',
						'./app/client/tsconfig.json',
					],
				},
			},
		},
	},

	// ✅ 2. Client (React) specific overrides
	{
		files: ['app/client/**/*.{ts,tsx}'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'import/extensions': 'off',
		},
	},

	// ✅ 3. Tests
	{
		files: ['tests/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.test.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'import/extensions': 'off',
		},
	},
];
