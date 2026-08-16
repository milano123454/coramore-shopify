/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        cream: 'rgb(var(--sc-bg) / <alpha-value>)',
        sand: 'rgb(var(--sc-surface) / <alpha-value>)',
        ink: 'rgb(var(--sc-text) / <alpha-value>)',
        smoke: 'rgb(var(--sc-muted) / <alpha-value>)',
        flame: { DEFAULT: 'rgb(var(--sc-accent) / <alpha-value>)', dark: 'rgb(var(--sc-accent-dark) / <alpha-value>)' },
        cta: { DEFAULT: 'rgb(var(--sc-cta) / <alpha-value>)', dark: 'rgb(var(--sc-cta-dark) / <alpha-value>)' },
        trustpilot: 'rgb(var(--sc-trustpilot) / <alpha-value>)',
        klarna: 'rgb(var(--sc-klarna) / <alpha-value>)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
