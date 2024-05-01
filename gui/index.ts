import "css/index.css";

import * as Juce from "juce-framework-frontend";

const gainState = Juce.getSliderState("gain");
const phaseState = Juce.getToggleState("invertPhase");

console.log(gainState);
console.log(phaseState);

const gainSlider = document.getElementById("gain-slider") as HTMLInputElement;
const phaseButton = document.getElementById("invert-phase-button") as HTMLInputElement;

gainSlider.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    gainState.setNormalisedValue(target.value);
    console.log(gainState);
});

gainState.valueChangedEvent.addListener(() => {
    gainSlider.value = gainState.getNormalisedValue();
});

phaseButton.addEventListener("click", () => {
    phaseState.setValue(true);
    console.log(phaseState);
});
