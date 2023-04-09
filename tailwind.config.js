/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PyeongChangPeace: "PyeongChangPeace",
        PyeongChang: "PyeongChang",
        "PyeongChangPeace-Bold": "PyeongChangPeace-Bold",
        "PyeongChang-Bold": "PyeongChang-Bold",
      },
      colors: {
        pink: { regular: "#FF6477", light: "#FF888F", lighter: "#FFD9DB" },
        green: { regular: "#089A83" },
        yellow: { regular: "#FEF01B" },
        gray: {
          dark: "#272526",
          regular: "#404040",
          light: "#494950",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
