export const updateTheme = (darkMode: boolean) => {
    document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", darkMode ? "dark" : "light");

    darkMode
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
};

export const checkDarkMode = () => {
    return document.querySelector('meta[name="color-scheme"]')?.getAttribute("content") === "dark";
};
