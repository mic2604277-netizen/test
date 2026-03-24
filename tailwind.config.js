/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#0a0f1e',
        cyanpulse: '#22d3ee',
        violetneon: '#8b5cf6',
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 211, 238, 0.35)',
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
