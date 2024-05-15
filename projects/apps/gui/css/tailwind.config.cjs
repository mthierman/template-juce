/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./projects/apps/gui/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            sans: ["system-ui", "ui-sans-serif", "sans-serif"],
        },
    },
};
