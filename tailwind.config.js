// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "primary-text": "var(--primary-text)",
        background: "var(--background)",
        accent: "var(--accent)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
