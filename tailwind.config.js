// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Escaneia todos os arquivos do app e componentes em busca de classes
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  // Importante para o NativeWind e modo escuro manual via classe
  darkMode: 'class', 
  theme: {
    extend: {
      // Cores mapeadas para as variáveis dinâmicas do global.css
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          subtle: "var(--color-accent-subtle)",
        },
        emotion: "var(--color-emotion)",
        border: "var(--color-border)",
        focus: "var(--color-focus-ring)",
        // Paleta Core explícita caso seja necessária uma aplicação fixa (sem importar o tema)
        core: {
          forest: '#1B3A2E',
          emerald: '#006D4E',
          lilac: '#9A7CA7',
          black: '#111111',
          offwhite: '#FAF7F2',
        }
      },
      
      // Tipografia Baseada no Design System
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["Inter", "Satoshi", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        // A fonte OpenDyslexic será injetada globalmente via CSS se a classe .dyslexia estiver ativa,
        // mas podemos mapeá-la se precisarmos forçar em algum componente.
        dyslexic: ["OpenDyslexic", "Comic Neue", "sans-serif"],
      },
      
      // Escala Tipográfica (rem base = 16px)
      fontSize: {
        detail: ["0.75rem", { lineHeight: "1.3", fontWeight: "400" }],
        sm: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],
        base: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        lg: ["1.125rem", { lineHeight: "1.5", fontWeight: "400" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        h2: ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
      },

      // Espaçamento Baseado em múltiplos de 4px
      spacing: {
        1: "0.25rem",  // 4px
        2: "0.5rem",   // 8px
        3: "0.75rem",  // 12px
        4: "1rem",     // 16px
        6: "1.5rem",   // 24px
        8: "2rem",     // 32px
        12: "3rem",    // 48px
        16: "4rem",    // 64px
      },

      // Arredondamento (Border Radius)
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "999px",
      },

      // Sombras Mapeadas para CSS Variables
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },

      // Transições Emocionais do NÓS
      transitionDuration: {
        colors: "150ms",
        opacity: "300ms",
        transform: "400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.2, 0.9, 0.4, 1.1)", // Easing editorial suave
      }
    },
  },
  plugins: [],
};