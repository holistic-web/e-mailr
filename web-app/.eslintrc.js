module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/singleline-html-element-content-newline': 0,
  },
}
