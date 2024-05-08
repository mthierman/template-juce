export default (theme: string) => {
    let darkMode =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : theme === "dark";

    localStorage.setItem("theme", theme);

    document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", darkMode ? "dark" : "light");

    darkMode
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
};
