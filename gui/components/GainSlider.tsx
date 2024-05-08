import InvertPhaseToggle from "components/InvertPhaseToggle";
import * as Juce from "juce-framework-frontend";
import { ChangeEvent, MouseEvent, WheelEvent, useEffect, useRef, useState } from "react";

const clamp = () => {
    return Math.max();
};

export default function GainSlider() {
    const slider = useRef<HTMLInputElement | null>(null);
    const sliderState = Juce.getSliderState("gain");
    const [value, setValue] = useState(sliderState.getNormalisedValue());
    const [properties, setProperties] = useState(sliderState.properties);

    useEffect(() => {
        const valueListenerId = sliderState.valueChangedEvent.addListener(() => {
            setValue(sliderState.getNormalisedValue());
        });

        return () => {
            sliderState.valueChangedEvent.removeListener(valueListenerId);
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        sliderState.setNormalisedValue(event.currentTarget.value);
        setValue(event.currentTarget.value);
    };

    const handleMouseDown = () => {
        sliderState.sliderDragStarted();
    };

    const handleMouseUp = (event: MouseEvent<HTMLInputElement>) => {
        sliderState.setNormalisedValue(event.currentTarget.value);
        sliderState.sliderDragEnded();
    };

    const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
        let newValue: number;

        if (event.deltaY < 0) {
            newValue = Number(value) + (event.shiftKey ? 0.01 : 0.1);
        } else {
            newValue = Number(value) - (event.shiftKey ? 0.01 : 0.1);
        }

        if (newValue < 0) {
            newValue = 0;
        } else if (newValue > 1) {
            newValue = 1;
        }

        setValue(newValue.toFixed(2));
        sliderState.setNormalisedValue(newValue.toFixed(2));
    };

    // useEffect(() => {
    //     console.log(gain);
    // }, [gain]);

    return (
        <div className="flex gap-1 p-2">
            <InvertPhaseToggle />
            <input
                type="range"
                ref={slider}
                value={value}
                min="0.00"
                max="1.00"
                step="0.01"
                onChange={handleChange}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="min-w-12 flex-grow cursor-pointer appearance-none bg-transparent focus:outline-none [&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:rounded-xl [&::-webkit-slider-runnable-track]:bg-black [&::-webkit-slider-runnable-track]:p-1 dark:[&::-webkit-slider-runnable-track]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-emerald-400 dark:[&::-webkit-slider-thumb]:bg-black hover:dark:[&::-webkit-slider-thumb]:bg-emerald-600"
            />
            <span className="pointer-events-none text-nowrap">-20.0 dB</span>
        </div>
    );
}
