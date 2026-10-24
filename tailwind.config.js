/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			brand: {
  					forest: '#173F32',
  					leaf: '#9ABF82',
  					cream: '#F4F0E5',
  					teal: '#438B78',
  					carbon: '#202925'
  				}
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(16px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'pulse-ring': {
  				'0%': { transform: 'scale(0.9)', opacity: '0.7' },
  				'70%': { transform: 'scale(1.4)', opacity: '0' },
  				'100%': { transform: 'scale(1.4)', opacity: '0' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-12px)' }
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
  				'50%': { transform: 'translateY(-20px) rotate(2deg)' }
  			},
  			'drift': {
  				'0%, 100%': { transform: 'translate(0px, 0px)' },
  				'33%': { transform: 'translate(15px, -10px)' },
  				'66%': { transform: 'translate(-10px, 8px)' }
  			},
  			'shimmer': {
  				'0%': { backgroundPosition: '-200% center' },
  				'100%': { backgroundPosition: '200% center' }
  			},
  			'gradient-pan': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' }
  			},
  			'glow-pulse': {
  				'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
  				'50%': { opacity: '0.7', transform: 'scale(1.05)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-up': 'fade-up 0.6s ease-out both',
  			'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
  			'float': 'float 6s ease-in-out infinite',
  			'float-slow': 'float-slow 8s ease-in-out infinite',
  			'drift': 'drift 10s ease-in-out infinite',
  			'shimmer': 'shimmer 3s linear infinite',
  			'gradient-pan': 'gradient-pan 8s ease infinite',
  			'glow-pulse': 'glow-pulse 4s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
