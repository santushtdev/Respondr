/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brandBg: '#E4E3EC',
        brandDark: '#191927',
        brandPurple: '#8E72EE',
        brandPurpleHover: '#7b5fe6',
        brandTeal: '#00D7D2',
        brandMutedText: '#6D6A82',
        brandEditorGutter: '#212133',
        brandEditorText: '#E4E3EC',
        brandEditorDim: '#A29FBA'
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
