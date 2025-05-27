export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAEAEF',
          100: '#D5D5DF',
          200: '#ABABBF',
          300: '#82829F',
          400: '#58587F',
          500: '#313166', // primary blue
          600: '#272752',
          700: '#1D1D3D',
          800: '#131329',
          900: '#0A0A14',
        },
        secondary: {
          50: '#FDE8EE',
          100: '#FBD1DD',
          200: '#F7A3BB',
          300: '#F37599',
          400: '#EF4777',
          500: '#EC396F', // secondary pink
          600: '#BD2E59',
          700: '#8E2243',
          800: '#5F172C',
          900: '#2F0B16',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd2',
          200: '#ffd897',
          300: '#ffbe58',
          400: '#ffa51b',
          500: '#f5900b',
          600: '#db6a04',
          700: '#b64708',
          800: '#93370e',
          900: '#792e0f',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 25px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #313166 0%, #EC396F 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, rgba(49,49,102,0.1) 0%, rgba(236,57,111,0.1) 100%)',
      },
    },
  },
  plugins: [],
}