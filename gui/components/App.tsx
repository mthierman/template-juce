import { SyntheticEvent, useEffect, useRef, useState } from "react";

import * as Juce from "juce-framework-frontend";

import "css/index.css";
import svg from "modules/svg";
import logo_dark from "images/logo_dark.svg?raw";
import logo_light from "images/logo_light.svg?raw";

import GainSlider from "components/GainSlider";
import InvertPhaseToggle from "components/InvertPhaseToggle";

const logoSvg = {
    dark: svg(logo_dark),
    light: svg(logo_light),
};

// const gainSlider = document.getElementById("gain-slider") as HTMLInputElement;
// const phaseButton = document.getElementById("invert-phase-toggle") as HTMLInputElement;

// gainSlider.addEventListener("input", (e: Event) => {
//     const target = e.target as HTMLInputElement;
//     console.log(target.value);
//     gainState.setNormalisedValue(target.value);
//     console.log(gainState);
// });

// gainState.valueChangedEvent.addListener(() => {
//     gainSlider.value = gainState.getNormalisedValue();
// });

// phaseButton.addEventListener("click", () => {
//     phaseState.setValue(true);
//     console.log(phaseState);
// });

const changeTheme = (theme: string) => {
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

export default function App() {
    const [theme, setTheme] = useState("light");

    // setTheme("light");

    useEffect(() => {
        // setTheme("dark");
        // changeTheme(theme);
        changeTheme("dark");
    }, []);

    return (
        <main className="size-full bg-blue-50 dark:bg-blue-950">
            <img src={theme === "dark" ? logoSvg.dark : logoSvg.light} draggable={false} />
            <GainSlider />
            <InvertPhaseToggle />
        </main>
    );
}
