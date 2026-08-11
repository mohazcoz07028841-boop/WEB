import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#081B33",
        charcoal: "#232F3E",
        gold: "#C9A166",
        warm: "#F7F5F0",
        ivory: "#F4EEE5",
      },
      boxShadow: {
        soft: "0 24px 75px rgba(8, 27, 51, 0.14)",
        glow: "0 0 0 1px rgba(201, 161, 102, 0.14), 0 35px 80px rgba(8, 27, 51, 0.08)",
      },
      backgroundImage: {
        "hero-fade": "radial-gradient(circle at top, rgba(201,161,102,0.14), transparent 22%), radial-gradient(circle at 45% 15%, rgba(255,255,255,0.08), transparent 35%)",
        "section-texture": "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.08), transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 80%)",
      },
    },
  },
  plugins: [],
};

export default config;
