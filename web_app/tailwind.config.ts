import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "lg-custom": "992px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Glamlink colors
        glamlink: {
          teal: "#22B8C8",
          "teal-dark": "#1A8F9C",
          "teal-light": "#4AC7D5",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        roboto: ["var(--font-roboto)", "Roboto", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      lineClamp: {
        3: "3",
      },
      fontSize: {
        "sm-custom": "1rem", // 16px for navigation links
        base: "1.25rem", // 20px instead of default 16px
        xl: "1.5rem", // 24px instead of default 20px
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
