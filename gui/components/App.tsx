import { useState, useEffect } from "react";

import "css/index.css";
import { checkDarkMode, updateTheme, loadTheme, loadLogo } from "modules/changeTheme";

import GainSlider from "components/GainSlider";
import InvertPhaseToggle from "components/InvertPhaseToggle";

export default function App() {
    const [theme, setTheme] = useState(loadTheme());
    const [logo, setLogo] = useState(loadLogo());

    updateTheme(
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : theme === "dark",
    );

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            updateTheme(
                theme === "system"
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    : theme === "dark",
            );
            setLogo(loadLogo());
        });
    }, []);

    return (
        <main>
            <img src={logo} draggable={false} />
            <GainSlider />
            <InvertPhaseToggle />
        </main>
    );
}
