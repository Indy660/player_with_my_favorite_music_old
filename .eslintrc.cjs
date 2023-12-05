/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")


module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // новые
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: ["airbnb-typescript/base", "prettier"],
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: [".eslintrc.{js,cjs}"],
//       parserOptions: {
//         sourceType: "script",
//       },
//     },
//   ],
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//     project: "./tsconfig.json",
//   },
//   rules: {},
// };
