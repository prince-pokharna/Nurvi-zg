import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Luxury Color Palette - Warm Golds and Creams
        luxury: {
          50: "#fefdf8", // Lightest cream
          100: "#fef7e0", // Light cream
          200: "#fdecc4", // Soft cream
          300: "#fbdc9c", // Light gold
          400: "#f8c572", // Medium gold
          500: "#f4a855", // Primary gold
          600: "#e8903a", // Rich gold
          700: "#d17532", // Deep gold
          800: "#a85d2e", // Bronze
          900: "#874d29", // Dark bronze
          950: "#4a2614", // Darkest bronze
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Primary gold
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        cream: {
          50: "#fefdfb",
          100: "#fef9f0",
          200: "#fdf2e1",
          300: "#fbe8c8",
          400: "#f8d9a3",
          500: "#f4c474",
          600: "#eda545",
          700: "#e08928",
          800: "#c06d1f",
          900: "#9c5a1c",
          950: "#532e0c",
        },
        champagne: {
          50: "#fefdfb",
          100: "#fef8f0",
          200: "#fdf0e1",
          300: "#fbe4c8",
          400: "#f8d3a3",
          500: "#f4bd74",
          600: "#eda245",
          700: "#e08628",
          800: "#c06a1f",
          900: "#9c571c",
          950: "#532d0c",
        },
        pearl: {
          50: "#fefefe",
          100: "#fdfdfd",
          200: "#fafafa",
          300: "#f5f5f5",
          400: "#eeeeee",
          500: "#e0e0e0",
          600: "#c2c2c2",
          700: "#9e9e9e",
          800: "#757575",
          900: "#616161",
          950: "#404040",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(244, 168, 85, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(244, 168, 85, 0.8)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "luxury-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(244, 168, 85, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(244, 168, 85, 0)" },
        },
        "golden-shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "luxury-pulse": "luxury-pulse 2s infinite",
        "golden-shine": "golden-shine 2s ease-in-out infinite",
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(135deg, #f4a855 0%, #e8903a 25%, #d17532 50%, #c06a1f 75%, #9c571c 100%)",
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)",
        "rose-gold-gradient":
          "linear-gradient(135deg, #fda4af 0%, #fb7185 25%, #f43f5e 50%, #e11d48 75%, #be123c 100%)",
        "cream-gradient": "linear-gradient(135deg, #f8d9a3 0%, #f4c474 25%, #eda545 50%, #e08928 75%, #c06d1f 100%)",
        "champagne-gradient":
          "linear-gradient(135deg, #f8d3a3 0%, #f4bd74 25%, #eda245 50%, #e08628 75%, #c06a1f 100%)",
        "pearl-gradient": "linear-gradient(135deg, #fefefe 0%, #f5f5f5 25%, #eeeeee 50%, #e0e0e0 75%, #c2c2c2 100%)",
        "luxury-radial": "radial-gradient(circle at center, #f4a855 0%, #e8903a 50%, #d17532 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
