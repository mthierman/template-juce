export default (theme: string) => {
    let isDark: boolean;

    if (theme === "system") {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
        isDark = theme === "dark" ? true : false;
    }

    localStorage.setItem("theme", theme);

    document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", isDark ? "dark" : "light");

    isDark
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
};
