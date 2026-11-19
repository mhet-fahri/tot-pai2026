/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      'sm': '600px',
      'md': '1024px',
      'lg': '1440px',
    },
    extend: {
      colors: {
        google: {
          blue: 'var(--g-blue)',
          text: 'var(--g-text-primary)',
          muted: 'var(--g-text-secondary)',
          border: 'var(--g-border)',
          surface: 'var(--g-surface)',
          subtle: 'var(--glue-color-surface-subtle)',
          blueHover: 'var(--glue-color-primary-hover)',
          blueBg: 'var(--glue-color-primary-container)',
          success: 'var(--glue-color-success)',
          successBg: 'var(--glue-color-success-container)',
          warning: 'var(--glue-color-warning)',
          warningBg: 'var(--glue-color-warning-container)',
          error: 'var(--glue-color-error)',
        }
      },
      fontFamily: {
        sans: ['var(--font-main)', 'sans-serif'],
      },
      borderRadius: {
        'card': 'var(--radius-card)',
        'pill': 'var(--radius-pill)',
        '2xl': 'var(--radius-card)',
      }
    },
  },
  plugins: [],
}
