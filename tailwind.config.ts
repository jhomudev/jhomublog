import { nextui } from "@nextui-org/theme"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './node_modules/@nextui-org/theme/dist/components/(pagination|avatar|dropdown|user|toggle|modal|tabs).js',
    './client/(pages)/**/*.{ts,tsx}',
    './client/components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        bg_main: '#FFFFFF',
        bg_soft: '#F0F0F0',
        text_color: '#000000',
        text_color_soft: '#626262',
        bg_main_dark: '#0F172A',
        bg_soft_dark: '#1F273A',
        text_color_dark: '#DDD',
        text_color_soft_dark: '#A6A6A6',
        main_color: '#14A297',
        destructive_color: '#f31260'
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config

export default config