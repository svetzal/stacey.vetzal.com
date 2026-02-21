/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#007acc',
        accent: '#66E0FF',
        heading: '#282c35',
      },
      maxWidth: {
        container: '672px',
      },
    },
  },
  plugins: [],
};
