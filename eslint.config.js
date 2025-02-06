import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from '@typescript-eslint/parser';

/**
 * Global ESLint configuration for a monorepo.
 *
 * This configuration applies baseline rules and settings for all packages in the monorepo.
 * Individual packages can override or extend these globals with package-specific configuration.
 *
 * @type {import('eslint').Linter.FlatConfigItem[]}
 */
export default [
    // Base recommended config from ESLint
    js.configs.recommended,
    { ignores: ["**/node_modules/**", "**/dist/**"] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        // Base JavaScript configuration
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        }
    },
    {
        // TypeScript-specific configuration
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.test.ts', '**/*.test.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json'
            },
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin
        },
        rules: {
            ...tsEslintPlugin.configs['recommended'].rules,
            'no-console': 'warn'
        }
    },
    {
        // Prettier integration
        plugins: {
            prettier
        },
        rules: {
            // 'prettier/prettier': 'warn'
        }
    },
    {
        // Test files configuration to avoid lint errors in tests
        files: [
            "**/*.{test,spec}.{js,jsx,ts,tsx}",
            "**/tests/**/*.{js,jsx,ts,tsx}",
        ],
        languageOptions: {
            globals: {
                // Jest globals (adjust these if using another test framework like Mocha or Vitest)
                describe: "readonly",
                it: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            "no-console": "off", // allow console statements in tests
            "no-unused-expressions": "off", // allow Chai/Jest style assertions
        },
    }
]; 