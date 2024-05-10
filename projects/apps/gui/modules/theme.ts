export const svgUrl = (rawSvg: string) => {
    return `data:image/svg+xml,${encodeURIComponent(rawSvg)}`;
};

export const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
        localStorage.setItem("theme", "system");
    }

    return storedTheme ? storedTheme : "system";
};

export const applyTheme = (theme: string) => {
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
