import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ShopIQ brand tokens — do not hardcode hex values elsewhere, reference these
        primary: {
          DEFAULT: "#1E40AF", // Royal Blue
          hover: "#1B3697",
          light: "#EFF3FC",
        },
        gold: {
          DEFAULT: "#F59E0B", // Premium accent — used sparingly
          light: "#FEF3E2",
        },
        success: {
          DEFAULT: "#16A34A", // In Stock / Confirmed
          light: "#EAF7EE",
        },
        warning: {
          DEFAULT: "#F97316", // Limited stock / flash sale
          light: "#FFF1E6",
        },
        danger: {
          DEFAULT: "#DC2626", // Out of stock / remove / error
          light: "#FDECEC",
        },
        background: "#FAFAFA",
        surface: "#FFFFFF",
        text: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
        border: "#E5E7EB",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
        image: "16px",
      },
      spacing: {
        // ShopIQ spacing scale
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "64px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(31, 41, 55, 0.06)",
        "card-hover": "0 8px 24px rgba(31, 41, 55, 0.12)",
      },
      screens: {
        xs: "375px", // large mobile
      },
    },
  },
  plugins: [],
};

export default config;
