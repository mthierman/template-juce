import { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as Juce from "juce-framework-frontend";

export default function GainSlider() {
    const gainSlider = useRef<HTMLInputElement | null>(null);
    const [gain, setGain] = useState("0.50");
    const [shiftKey, setShiftKey] = useState(false);

    const gainState = Juce.getSliderState("gain");

    useEffect(() => {
        gainState.valueChangedEvent.addListener(() => {
            setGain(gainState.getNormalisedValue());
        });
        console.log(gainState);
    }, []);

    const handleGainChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setGain(target.value);
        gainState.setNormalisedValue(target.value);
    };

    const handleGainWheel = (e: SyntheticEvent) => {
        console.log(gain);

        const target = e.currentTarget as HTMLInputElement;
        const event = e.nativeEvent as WheelEvent;

        event.shiftKey ? setShiftKey(true) : setShiftKey(false);

        if (event.deltaY < 0) {
            setGain((Number(gain) + (event.shiftKey ? 0.01 : 0.1)).toFixed(2));
        } else {
            setGain((Number(gain) - (event.shiftKey ? 0.01 : 0.1)).toFixed(2));
        }
    };

    useEffect(() => {
        console.log(gain);
    }, [gain]);

    return (
        <label>
            -20.0 dB
            <input
                className="[&::-webkit-slider-runnable-track]:bg-black dark:[&::-webkit-slider-runnable-track]:bg-white [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-blue-500 dark:[&::-webkit-slider-thumb]:bg-black hover:dark:[&::-webkit-slider-thumb]:bg-blue-500"
                ref={gainSlider}
                type="range"
                min="0.00"
                max="1.00"
                value={gain}
                onChange={handleGainChange}
                onWheel={handleGainWheel}
                step="0.01"
            />
        </label>
    );
}
