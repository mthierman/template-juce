import { SyntheticEvent, useEffect, useRef, useState } from "react";

import * as Juce from "juce-framework-frontend";

import "css/index.css";
import svg from "modules/svg";
import changeTheme from "modules/changeTheme";
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
        return storedTheme ? storedTheme : "system";
    });

    changeTheme(theme);

    return (
        <main>
            <img
                src={
                    document.querySelector('meta[name="color-scheme"]')?.getAttribute("content") ===
                    "dark"
                        ? logoSvg.dark
                        : logoSvg.light
                }
                draggable={false}
            />
            <GainSlider />
            <InvertPhaseToggle />
        </main>
    );
}
