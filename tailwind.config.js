export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4EFE6', salt: '#FBF9F4', ink: '#1C1917',
        sunset: '#D9622B', gold: '#B8862F', sand: '#E4D8C3'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
