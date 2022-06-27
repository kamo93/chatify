const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "0px repeat(12, 1fr)",
        "main-open": "15rem repeat(12, 1fr)",
      },
      gridTemplateRows: {
        "main-rows": "3.5rem 1fr"
      },
      colors: {
        blue: {
          50: "#d9e1f5",
          100: "#c0cceb",
          150: "#a7b8e1",
          200: "#90a5d7",
          300: "#6d85bf",
          400: "#4e68a7",
          500: "#35508f",
          600: "#203a77", // base color https://colorbox.io/?c0=%26p%24s%24%3D10%26p%24h%24st%24%3D224%26p%24h%24e%24%3D228%26p%24h%24c%24%3Dl%26p%24sa%24st%24%3D0.04%26p%24sa%24e%24%3D0.55%26p%24sa%24r%24%3D1%26p%24sa%24c%24%3Dl%26p%24b%24st%24%3D1%26p%24b%24e%24%3D0.02%26p%24b%24c%24%3Dl%26o%24n%24%3D%23203a77%26o%24ro%24%3Dcw%26o%24ms%24%3D0%2C1%26o%24lockHex%24%3D%23203a77
          700: "#1b2951",
          800: "#11172b",
          900: "#020305",
        },
      },
    },
  },
  plugins: [],
};
