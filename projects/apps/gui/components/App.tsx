import Fetch from "components/Fetch";
import "css/index.css";
import { applyTheme, loadTheme } from "modules/theme";
import { useEffect, useState } from "react";

export default function App() {
    const [theme, setTheme] = useState(loadTheme());

    applyTheme(theme);

    useEffect(() => {
        const themeChange = () => {
            if (theme === "system") {
                applyTheme(theme);
            }
        };

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", themeChange);

        return () => {
            mql.removeEventListener("change", themeChange);
        };
    }, []);

    return (
        <>
            <Fetch />
        </>
    );
}
