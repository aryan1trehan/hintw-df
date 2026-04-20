import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ─── Font Families ─── */
      fontFamily: {
        // Cormorant Garamond → H1 / H2
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        serif:   ['var(--font-cormorant)', 'Georgia', 'serif'],
        // Montserrat → Body / UI / Navigation
        body:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },

      /* ─── Colors (black & white palette) ─── */
      colors: {
        'bg':               '#000000',
        'teal':             '#000000',
        'emerald':          '#000000',
        'gold':             '#ffffff',
        'gold-light':       '#ffffff',
        'gold-dim':         'rgba(255, 255, 255, 0.25)',
        'cream':            '#ffffff',
        'cream-dim':        'rgba(255, 255, 255, 0.65)',
        'white':            '#ffffff',
        'dark-green':       '#000000',
        'dark-green-light': '#000000',
        'dark-green-dark':  '#000000',
        'light-green':      '#000000',
      },
    },
  },
  plugins: [],
}
export default config
