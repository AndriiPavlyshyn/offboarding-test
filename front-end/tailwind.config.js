const { join } = require('path')

/** @return {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, './src/**/!(*.stories|*.spec).{ts,html}')],
  important: true,
  theme: {
    extend: {},
    screens: {
      'mobile-small': '320px',
      'mobile-medium': '375px',
      'mobile-large': '480px',
      'tablet': '640px',
      'tablet-medium': '768px',
      'tablet-large': '960px',
      'laptop': '1200px',
      'desktop': '1440px',
    },
    container: {
      padding: '15px',
      screens: {
        xl: '1320px',
      },
    },
  },
}
