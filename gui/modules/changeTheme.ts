import logo_dark from "images/logo_dark.svg?raw";
import logo_light from "images/logo_light.svg?raw";
import svg from "modules/svg";

export const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
        localStorage.setItem("theme", "system");
    }

    return storedTheme ? storedTheme : "system";
};

export const loadLogo = () => {
    return document.documentElement.classList.contains("dark") ? svg(logo_dark) : svg(logo_light);
};

export const updateTheme = (theme: string) => {
    const darkMode =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : theme === "dark";

    document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", darkMode ? "dark" : "light");

    darkMode
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
};
