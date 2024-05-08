import { useState, useEffect } from "react";

import "css/index.css";
import { updateTheme, loadTheme, loadLogo } from "modules/changeTheme";

import GainSlider from "components/GainSlider";
import InvertPhaseToggle from "components/InvertPhaseToggle";

export default function App() {
    const [theme, setTheme] = useState(loadTheme());
    const [logo, setLogo] = useState(loadLogo());

    updateTheme(theme);

    useEffect(() => {
        const themeChange = () => {
            if (theme === "system") {
                updateTheme(theme);
                setLogo(loadLogo());
            }
        };

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", themeChange);

        return window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", themeChange);
    }, []);

    return (
        <main>
            <img className="select-none" src={logo} draggable="false" />
            <GainSlider />
            <InvertPhaseToggle />
        </main>
    );
}
