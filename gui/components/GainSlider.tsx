import InvertPhaseToggle from "components/InvertPhaseToggle";
import * as Juce from "juce-framework-frontend";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

export default function GainSlider() {
    const gainSlider = useRef<HTMLInputElement | null>(null);
    const [gain, setGain] = useState("0.50");

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
        const event = e.nativeEvent as WheelEvent;

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
        <div className="flex gap-1 p-2">
            <InvertPhaseToggle />
            <input
                className="min-w-12 flex-grow cursor-pointer appearance-none bg-transparent focus:outline-none [&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:rounded-xl [&::-webkit-slider-runnable-track]:bg-black [&::-webkit-slider-runnable-track]:p-1 dark:[&::-webkit-slider-runnable-track]:bg-white [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                hover:[&::-webkit-slider-thumb]:bg-emerald-400
                dark:[&::-webkit-slider-thumb]:bg-black
                hover:dark:[&::-webkit-slider-thumb]:bg-emerald-600"
                ref={gainSlider}
                type="range"
                min="0.00"
                max="1.00"
                value={gain}
                onChange={handleGainChange}
                onWheel={handleGainWheel}
                step="0.01"
            />
            <span className="pointer-events-none text-nowrap">-20.0 dB</span>
        </div>
    );
}
