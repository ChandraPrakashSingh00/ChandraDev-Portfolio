/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        card: '#F8FAFC',
        secondary: '#EAF2FF',
        border: '#E2E8F0',
        primary: '#086FFD',
        bluesec: '#0447D2',
        purple: '#032487',
        text: '#334155',
        muted: '#64748B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #086FFD 0%, #0447D2 50%, #032487 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(8,111,253,0.15), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(8,111,253,0.20)',
        'glow-purple': '0 0 30px rgba(3,36,135,0.12)',
        card: '0 4px 20px rgba(15,23,42,0.06)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'gradient-move': 'gradient-move 8s ease infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
}
