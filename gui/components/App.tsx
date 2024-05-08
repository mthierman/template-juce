import { useState, useEffect } from "react";

import "css/index.css";
import svg from "modules/svg";
import { checkDarkMode, updateTheme } from "modules/changeTheme";
import logo_dark from "images/logo_dark.svg?raw";
import logo_light from "images/logo_light.svg?raw";

import GainSlider from "components/GainSlider";
import InvertPhaseToggle from "components/InvertPhaseToggle";

const logoSvg = {
    dark: svg(logo_dark),
    light: svg(logo_light),
};

export default function App() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme;
        } else {
            localStorage.setItem("theme", "system");
            return "system";
        }
    });
    const [logo, setLogo] = useState(checkDarkMode() ? logoSvg.dark : logoSvg.light);

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
            setLogo(checkDarkMode() ? logoSvg.dark : logoSvg.light);
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
