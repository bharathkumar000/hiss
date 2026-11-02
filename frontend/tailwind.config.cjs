/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // SYNAPSE Premium Design System
        synapse: {
          // Backgrounds
          background: '#FFFFFF',
          surface: '#F7F8FA',
          'surface-hover': '#EEF0F4',
          
          // Text
          'text-primary': '#171923',
          'text-secondary': '#667085',
          'text-muted': '#98A2B3',
          
          // Borders
          border: '#E8EAF0',
          'border-strong': '#D0D5DD',
          
          // Brand Accent (Purple)
          accent: '#6246EA',
          'accent-hover': '#5038D0',
          'accent-light': '#F3F0FF',
          'accent-lighter': '#E9E4FA',
          
          // Semantic
          success: '#027A48',
          'success-light': '#ECFDF3',
          warning: '#B54708',
          'warning-light': '#FFFAEB',
          error: '#B42318',
          'error-light': '#FEF3F2',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monospace'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h1': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['30px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'radius-sm': '6px',
        'radius-md': '10px',
        'radius-lg': '14px',
        'radius-xl': '18px',
      },
      boxShadow: {
        'synapse-sm': '0 1px 2px 0 rgb(16 24 40 / 0.05)',
        'synapse-md': '0 4px 8px -2px rgb(16 24 40 / 0.08), 0 2px 4px -2px rgb(16 24 40 / 0.04)',
        'synapse-lg': '0 12px 24px -4px rgb(16 24 40 / 0.1), 0 8px 8px -4px rgb(16 24 40 / 0.04)',
        'synapse-xl': '0 20px 40px -8px rgb(16 24 40 / 0.12), 0 12px 12px -6px rgb(16 24 40 / 0.06)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}