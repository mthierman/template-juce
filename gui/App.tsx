import "css/index.css";

// import * as Juce from "juce-framework-frontend";

// const gainState = Juce.getSliderState("gain");
// const phaseState = Juce.getToggleState("invertPhase");

// console.log(gainState);
// console.log(phaseState);

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
    return (
        <main>
            <picture draggable="false">
                <source media="(prefers-color-scheme: dark)" srcSet="/logo_dark.svg" />
                <source media="(prefers-color-scheme: light)" srcSet="/logo_light.svg" />
                <img draggable="false" src="/logo_dark.svg" alt="logo" width="350" height="auto" />
            </picture>

            <div id="inputs">
                <label id="gain">
                    <span id="gain-slider-value">-20.0 dB</span>
                    <input id="gain-slider" type="range" min="0" max="1" value="0" step="0.01" />
                </label>

                <input type="checkbox" id="invert-phase-toggle" />
                <label htmlFor="invert-phase-toggle"></label>
            </div>
        </main>
    );
}
