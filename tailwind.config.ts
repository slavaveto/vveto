import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Светлая тема
        light: {
          background: '#ffffff', // Фон светлой темы
          text: '#212936', // Текст светлой темы
        },
        // Тёмная тема
        dark: {
          background: '#1e2329', // Фон тёмной темы
          text: '#a7adba', // Текст тёмной темы
        },

        navbarLight: '#e5e6e6', // Фон для светлой темы
        textLight: '#212936', // Текст для светлой темы
        navbarDark: '#16191e', // Фон для тёмной темы
        textDark: '#a7adba', // Текст для тёмной темы

        footerLight: '#e5e6e6', // Фон для светлой темы
        footerDark: '#16191e', // Фон для тёмной темы
      },
      maxWidth: {
        'xs2': '280px', // Для маленьких экранов
      },
    },
  },
  plugins: [nextui()],

} satisfies Config;
