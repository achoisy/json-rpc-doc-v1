import tsParser from '@typescript-eslint/parser';
import baseConfig from '../../eslint.config.js';

/**
 * Package-specific ESLint config for backend.
 * Overrides TypeScript settings found in the root configuration.
 */
export default [
    ...baseConfig,
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.test.ts', '**/*.test.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        }
    }
];
