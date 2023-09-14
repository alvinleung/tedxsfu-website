/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        baseline: "var(--baseline-grid-interval)",
        "grid-margin-x": "var(--grid-margin-x)",
        "grid-margin-y": "var(--grid-margin-y)",
        "grid-gap": "var(--grid-gap)",
        "logo-height": "26px",
        "nav-button-offset-y": "var(--nav-button-offset-y)",
        "nav-button-height": "46px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        header: ["36px", "1.06em"],
        lead: ["24px", "1.15em"],
        body: ["16px", "1.2em"],
        micro: ["14px", "1.20em"],
        "header-tablet": ["36px", "1.06em"],
        "lead-tablet": ["20px", "1.1em"],
        "body-tablet": ["16px", "1.2em"],
        "micro-tablet": ["13px", "1.11em"],
        "header-mobile": ["32px", "1.01em"],
        "lead-mobile": ["20px", "1.1em"],
        "body-mobile": ["16px", "1.2em"],
        "micro-mobile": ["13px", "1.11em"],
        nav: ["14px", "1.15em"],
        "nav-s": ["13px", "1.15em"],
        baseline: ["var(--baseline-grid-interval)", "1.125em"],
      },
      colors: {
        ted: "#EB0028",
      },
      screens: {
        xs: "390px",
        sm: "640px",
        md: "860px",
        lg: "1024px",
        xl: "1400px",
        "2xl": "1590px",
      },
    },
  },
  plugins: [],
};
