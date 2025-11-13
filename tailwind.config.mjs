import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-albert-sans)'],
        heading: ['var(--font-jost)'],
      },
      fontSize: {
        // Display / Hero - Jost (Título 1)
        display: [
          '2.75rem',
          {
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        'lg-display': [
          '5rem',
          {
            lineHeight: '1',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        // Heading - Jost (Título 2)
        heading: [
          '2.375rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        'lg-heading': [
          '3.375rem',
          {
            lineHeight: '1.2',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        // Subheading - Jost (Título 3)
        subheading: [
          '1.5rem',
          {
            lineHeight: '1.2',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'lg-subheading': [
          '2rem',
          {
            lineHeight: '1.2',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        // Body Large - Albert Sans (Parágrafo XL)
        'body-large': [
          '1.125rem',
          {
            lineHeight: '1.6',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'lg-body-large': [
          '1.25rem',
          {
            lineHeight: '1.8',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        // Body - Albert Sans (Parágrafo padrão)
        body: [
          '1rem',
          {
            lineHeight: '1.6',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'lg-body': [
          '1.125rem',
          {
            lineHeight: 'normal',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        // Caption / Small - Albert Sans (Parágrafo SM)
        caption: [
          '0.6875rem',
          {
            lineHeight: 'normal',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        'lg-caption': [
          '0.8125rem',
          {
            lineHeight: 'normal',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
