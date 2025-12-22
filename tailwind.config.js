/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-red': 'var(--brand-red)',
        'brand-blue': 'var(--brand-blue)',
        'brand-blue-light': 'var(--brand-blue-light)',
      },
    },
  },
  plugins: [],
};