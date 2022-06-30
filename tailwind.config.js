/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 */
//module.exports = require("@sentrei/tailwindcss");
// 'Inter': ['Inter'],
//            'display': ['Inter'],
//            'body': ['Inter'],
//, ...defaultTheme.fontFamily.sans
 colors = require("tailwindcss/colors");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  darkMode: "class",
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
            sans: ['Inter var'],
           
        },
      animation: {
       'spin-slow': 'spin 10s linear infinite',
        blob: "blob 10s infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-out-down": "fade-out-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out-up": "fade-out-up 0.5s ease-out",
        "gradient-background-1": "gradient-background-1 8s infinite",
        "gradient-foreground-1": "gradient-foreground-1 8s infinite",
        "gradient-background-2": "gradient-background-2 8s infinite",
        "gradient-foreground-2": "gradient-foreground-2 8s infinite",
        "gradient-background-3": "gradient-background-3 8s infinite",
        "gradient-foreground-3": "gradient-foreground-3 8s infinite",
      },
      backgroundImage: {
        conic: "conic-gradient(var(--tw-gradient-stops))",
        "conic-to-t": "conic-gradient(at top, var(--tw-gradient-stops))",
        "conic-to-b": "conic-gradient(at bottom, var(--tw-gradient-stops))",
        "conic-to-l": "conic-gradient(at left, var(--tw-gradient-stops))",
        "conic-to-r": "conic-gradient(at right, var(--tw-gradient-stops))",
        "conic-to-tl": "conic-gradient(at top left, var(--tw-gradient-stops))",
        "conic-to-tr": "conic-gradient(at top right, var(--tw-gradient-stops))",
        "conic-to-bl":
          "conic-gradient(at bottom left, var(--tw-gradient-stops))",
        "conic-to-br":
          "conic-gradient(at bottom right, var(--tw-gradient-stops))",
        radial: "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "radial-at-t":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "radial-at-b":
          "radial-gradient(ellipse at bottom, var(--tw-gradient-stops))",
        "radial-at-l":
          "radial-gradient(ellipse at left, var(--tw-gradient-stops))",
        "radial-at-r":
          "radial-gradient(ellipse at right, var(--tw-gradient-stops))",
        "radial-at-tl":
          "radial-gradient(ellipse at top left, var(--tw-gradient-stops))",
        "radial-at-tr":
          "radial-gradient(ellipse at top right, var(--tw-gradient-stops))",
        "radial-at-bl":
          "radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))",
        "radial-at-br":
          "radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))",
      },
      colors: {
        amber: colors.amber,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        lime: colors.lime,
        orange: colors.orange,
        rose: colors.rose,
        purple: colors.purple,
        sky: colors.sky,
        teal: colors.teal,
        trueGray: colors.trueGray,
        violet: colors.violet,
        warmGray: colors.warmGray,
        'amarillo-real': '#ffd1ad',
        'color-borde':'#dfdfe6',
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "25%": {
            transform: "translate(20px, -50px) scale(1.1)",
          },
          "50%": {
            transform: "translate(0, 20px) scale(1)",
          },
          "75%": {
            transform: "translate(-20px, -15px) scale(0.9)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "gradient-foreground-1": {
          "from, 16.667%, to": {
            opacity: 1,
          },
          "33.333%, 83.333%": {
            opacity: 0,
          },
        },
        "gradient-background-1": {
          "from, 16.667%, to": {
            opacity: 0,
          },
          "25%, 91.667%": {
            opacity: 1,
          },
        },
        "gradient-foreground-2": {
          "from, to": {
            opacity: 0,
          },
          "33.333%, 50%": {
            opacity: 1,
          },
          "16.667%, 66.667%": {
            opacity: 0,
          },
        },
        "gradient-background-2": {
          "from, to": {
            opacity: 1,
          },
          "33.333%, 50%": {
            opacity: 0,
          },
          "25%, 58.333%": {
            opacity: 1,
          },
        },
        "gradient-foreground-3": {
          "from, 50%, to": {
            opacity: 0,
          },
          "66.667%, 83.333%": {
            opacity: 1,
          },
        },
        "gradient-background-3": {
          "from, 58.333%, 91.667%, to": {
            opacity: 1,
          },
          "66.667%, 83.333%": {
            opacity: 0,
          },
        },
      },
      letterSpacing: {
        tightest: "-.06em",
      },
    },
  },
};

// module.exports = {
//     theme: {
//       extend: {
//         fontFamily: {
//           sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//         },
//       },
//     },
//   }