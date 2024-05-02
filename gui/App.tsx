import * as Juce from "juce-framework-frontend";

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
    const gainState = Juce.getSliderState("gain");
    const phaseState = Juce.getToggleState("invertPhase");

    console.log(gainState);
    console.log(phaseState);

    return (
        <main className="dark:bg-stone-800 bg-stone-200 size-full">
            <picture draggable="false">
                <source media="(prefers-color-scheme: dark)" srcSet="/logo_dark.svg" />
                <source media="(prefers-color-scheme: light)" srcSet="/logo_light.svg" />
                <img draggable="false" src="/logo_dark.svg" alt="logo" width="350" height="auto" />
            </picture>

            <label id="gain-slider-label" htmlFor="gain-slider">
                -20.0 dB
            </label>
            <input id="gain-slider" type="range" min="0" max="1" value="0" step="0.01" />

            <label id="invert-phase-toggle-label" htmlFor="invert-phase-toggle"></label>
            <input id="invert-phase-toggle" type="checkbox" />
        </main>
    );
}
