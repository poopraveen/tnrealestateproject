import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'chocolate-cream': '#D2B48C',
      },
    },
  },
  plugins: [],
} satisfies Config;
