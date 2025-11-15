// eslint.config.mjs
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['**/node_modules/**'],
  },
  nextPlugin.configs.recommended,
];
