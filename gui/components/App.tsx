import { SyntheticEvent, useEffect, useRef, useState } from "react";

import * as Juce from "juce-framework-frontend";

import GainSlider from "components/GainSlider";
import "css/index.css";

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

export default function App() {
    const invertPhaseToggle = useRef<HTMLInputElement | null>(null);
    const [phase, setPhase] = useState(false);

    const gainState = Juce.getSliderState("gain");
    const phaseState = Juce.getToggleState("invertPhase");

    useEffect(() => {
        console.log(gainState);
        console.log(phaseState);
    }, []);

    const handleGainChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setGain(target.value);
    };

    useEffect(() => {
        console.log(gain);
    }, [gain]);

    return (
        <main className="size-full bg-stone-200 dark:bg-stone-800">
            <picture draggable="false">
                <source media="(prefers-color-scheme: dark)" srcSet="/logo_dark.svg" />
                <source media="(prefers-color-scheme: light)" srcSet="/logo_light.svg" />
                <img draggable="false" src="/logo_dark.svg" alt="logo" width="350" height="auto" />
            </picture>

            <GainSlider />

            <label>
                <input
                    ref={invertPhaseToggle}
                    id="invert-phase-toggle"
                    type="checkbox"
                    defaultChecked={false}
                />
            </label>
        </main>
    );
}
