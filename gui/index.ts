import "css/index.css";

// import * as Juce from "juce-framework-frontend";
import * as Juce from "juce-framework-frontend";

console.log(Juce.getSliderState("gain"));

const sliderState = Juce.getSliderState("gain");

const gainSlider = document.getElementById("gain-slider") as HTMLInputElement;

gainSlider.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    sliderState.setNormalisedValue(target.value);
    console.log(Juce.getSliderState("gain"));
});

// type GainValueCallback = (sliderValue: string) => number;
// type ReceiveGainValue = (val: number) => void;

// declare global {
//     interface Window {
//         gainValueCallback: GainValueCallback;
//         receiveGainValue: ReceiveGainValue;
//     }
// }

// const gainSlider = document.getElementById("gain-slider") as HTMLInputElement;
// const gainLabel = document.getElementById("gain-label") as HTMLLabelElement;

// const sendSliderValue = (sliderValue: string) => {
//     sliderValue = parseFloat(sliderValue).toFixed(2);
//     gainLabel.innerHTML = sliderValue + "dB";

//     if (typeof window.gainValueCallback === "function") {
//         window.gainValueCallback(sliderValue);
//     }
// };

// window.receiveGainValue = (val: number) => {
//     val = Math.round(val * 1e2) / 100;
//     gainLabel.innerHTML = val.toFixed(2) + " dB";
//     gainSlider.value = val.toFixed(2);
// };

// gainSlider.addEventListener("input", (e: Event) => {
//     const target = e.target as HTMLInputElement;
//     sendSliderValue(target.value);
// });
