import { SyntheticEvent, useEffect, useRef, useState } from "react";

import * as Juce from "juce-framework-frontend";

import "css/index.css";

import GainSlider from "components/GainSlider";
import InvertPhaseToggle from "./InvertPhaseToggle";

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

const setTheme = (theme: string) => {
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
    setTheme("light");

    return (
        <main className="size-full bg-blue-50 dark:bg-blue-950">
            <picture draggable="false">
                <source media="(prefers-color-scheme: dark)" srcSet="/logo_dark.svg" />
                <source media="(prefers-color-scheme: light)" srcSet="/logo_light.svg" />
                <img draggable="false" src="/logo_dark.svg" alt="logo" width="350" height="auto" />
            </picture>

            <GainSlider />

            <InvertPhaseToggle />
        </main>
    );
}
