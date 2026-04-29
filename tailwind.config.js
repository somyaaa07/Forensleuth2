/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#207eff',
        orange: '#fa5330',
        obsidian: '#03060d',
        carbon: '#080f1a',
        slate: '#0d1626',
        panel: '#101c2e',
        border: '#1a2d47',
        muted: '#8099b8',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        'mono-tech': ['"Share Tech Mono"', 'monospace'],  // ← fixes font-mono-tech
      },
      animation: {
        'scan': 'scanDown 5s linear infinite',
        'pulse-blue': 'pulseBlue 3s ease-in-out infinite',
        'flicker': 'flicker 8s linear infinite',
        'data-stream': 'dataStream 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'border-run': 'borderRun 3s linear infinite',
        'blink': 'blink 1.4s step-end infinite',        // ← fixes blink animation
        'nodeFlicker': 'nodeFlicker 2s infinite',        // ← fixes nodeFlicker
      },
      keyframes: {
        scanDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(32,126,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(32,126,255,0.7)' },
        },
        flicker: {
          '0%, 98%, 100%': { opacity: '1' },
          '99%': { opacity: '0.8' },
        },
        dataStream: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        borderRun: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        nodeFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}