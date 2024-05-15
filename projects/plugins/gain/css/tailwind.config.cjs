/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./projects/plugins/gain/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        fontFamily: {
            sans: ["system-ui", "ui-sans-serif", "sans-serif"],
        },
    },
};
