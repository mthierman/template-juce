import "css/index.css";
import { useState, useEffect } from "react";
import { applyTheme, loadTheme, loadLogo } from "root/gui/modules/theme";
import GainSlider from "components/GainSlider";

export default function App() {
    const [theme, setTheme] = useState(loadTheme());
    const [logo, setLogo] = useState(loadLogo());

    applyTheme(theme);

    useEffect(() => {
        const themeChange = () => {
            if (theme === "system") {
                applyTheme(theme);
                setLogo(loadLogo());
            }
        };

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", themeChange);

        return () => {
            mql.removeEventListener("change", themeChange);
        };
    }, []);

    return (
        <main className="flex flex-col">
            <img className="select-none p-8" src={logo} draggable="false" />
            <GainSlider />
        </main>
    );
}
