export default (theme: string) => {
    let isDark =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : theme === "dark";

    localStorage.setItem("theme", theme);

    document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", isDark ? "dark" : "light");

    isDark
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
};
