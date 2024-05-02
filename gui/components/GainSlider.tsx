import { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as Juce from "juce-framework-frontend";

export default function GainSlider() {
    const gainSlider = useRef<HTMLInputElement | null>(null);
    const [gain, setGain] = useState("");

    const gainState = Juce.getSliderState("gain");

    useEffect(() => {
        console.log(gainState);
    }, []);

    const handleGainChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setGain(target.value);
    };

    useEffect(() => {
        console.log(gain);
    }, [gain]);

    return (
        <label>
            -20.0 dB
            <input
                ref={gainSlider}
                type="range"
                min="0"
                max="1"
                value={gain}
                onChange={handleGainChange}
                step="0.01"
            />
        </label>
    );
}
