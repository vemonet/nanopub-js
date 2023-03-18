module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_'
      }
    ]
    // "no-prototype-builtins": "off",
    // "no-useless-escape": "off",
    // "no-control-regex": "off",
    // "@typescript-eslint/ban-types": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/no-namespace": "off",
  },
  overrides: [
    {
      files: ['rollup.config.js', 'web-test-runner.config.js'],
      env: {
        node: true
      }
    }
    //   {
    //     "files": [
    //       "*_test.ts",
    //       "**/custom_typings/*.ts",
    //       "packages/labs/ssr/src/test/integration/tests/**",
    //       "packages/labs/ssr/src/lib/util/parse5-utils.ts"
    //     ],
    //     "rules": {
    //       "@typescript-eslint/no-explicit-any": "off"
    //     }
    //   }
  ],
  ignorePatterns: [
    '*.lock',
    'node_modules/*',
    'docs/*',
    'docs-src/*',
    'rollup-config.js',
    'custom-elements.json',
    'web-dev-server.config.js',
    'node_modules',
    'build',
    'coverage',
    'jest.config.js'
  ]
};
