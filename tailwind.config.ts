import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/react-chat/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-delay-1': 'bounce 1.3s infinite',
        'bounce-delay-2': 'bounce 1.45s infinite',
        'bounce-delay-3': 'bounce 1.6s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
