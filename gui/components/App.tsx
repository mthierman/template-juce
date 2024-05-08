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
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            if (theme === "system") {
                console.log("system theme, switching...");
                updateTheme(theme);
                setLogo(loadLogo());
            }
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
