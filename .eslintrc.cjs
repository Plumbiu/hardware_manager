module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['vue', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  settings: {
    'import/resolver': {
      // 项目里的别名
      alias: {
        map: [['@', './client/src']],
      },
    },
    // 运行的扩展名
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    // 解决 prettier 冲突
    'prettier',
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  // 自定义规则，根据组内成员灵活定义，可以覆盖上面 extends 继承的第三方库的规则
  rules: {
    // 禁用 alert、confirm、prompt、console、debugger
    'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eqeqeq': 'warn', // 要求使用 === 和 !==
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
    'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key
    'no-eval': 'error', // 禁用 eval()
    'no-self-compare': 'error', // 禁止自身比较
    'no-self-assign': 'error', // 禁止自我赋值
    'no-unused-vars': 'error', // 禁止出现未使用过的变量
    'no-func-assign': 'error', // 禁止对 function 声明重新赋值
    'no-mixed-spaces-and-tabs': 'error', //禁止混用tab和空格
    'indent': ['error', 2], //缩进风格这里不做硬性规定，但是产品组内要达成统一
    'quotes': ['error', 'single'], //要求引号类型 `` ' ''
    'semi': ['error', 'never'], //语句强制分号结尾
    // 禁止使用多余的包
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': 0,
    'vue/v-on-event-hyphenation': 0,
    'vue/comment-directive': 0,
  },
}
