module.exports = {
  '**/*.{ts,tsx}': () => 'npm run type-check',
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  '**/*.{json,css,scss,md}': [
    'prettier --write'
  ],
  '**/*.{css,scss}': [
    'stylelint --fix'
  ]
} 