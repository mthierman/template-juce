import type { Config } from "tailwindcss";

export default {
    content: ["./gui/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            sans: ["system-ui", "ui-sans-serif", "sans-serif"],
        },
    },
} satisfies Config;
