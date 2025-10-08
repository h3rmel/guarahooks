export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],
};
