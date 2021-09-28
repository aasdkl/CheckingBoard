module.exports = {
  // https://eslint.org/docs/user-guide/configuring/configuration-files#using-configuration-files
  root: true,
  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // https://eslint.vuejs.org/user-guide/#the-variables-used-in-the-template-are-warned-by-no-unused-vars-rule
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    // https://eslint.org/docs/rules/
    "eslint:recommended",
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
    "plugin:@typescript-eslint/recommended",
    // https://eslint.vuejs.org/user-guide/#bundle-configurations
    "plugin:vue/vue3-recommended",
    // https://github.com/prettier/eslint-config-prettier#installation
    "prettier",
  ],
  // https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/docs/getting-started/linting/README.md#configuration
  plugins: ["@typescript-eslint"],
  rules: {},
};
