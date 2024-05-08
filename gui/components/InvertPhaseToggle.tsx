import * as Juce from "juce-framework-frontend";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import tailwindConfig from "root/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig.js";

const tailwind = resolveConfig(tailwindConfig).theme.colors;

export default function InvertPhaseToggle() {
    const toggle = useRef<HTMLInputElement | null>(null);
    const toggleState = Juce.getToggleState("invertPhase");

    const [checked, setChecked] = useState(toggleState.getValue());
    const [properties, setProperties] = useState(toggleState.properties);

    useEffect(() => {
        const valueListenerId = toggleState.valueChangedEvent.addListener(() => {
            setChecked(toggleState.getValue());
        });
        const propertiesListenerId = toggleState.propertiesChangedEvent.addListener(() => {
            setProperties(toggleState.properties);
        });

        return () => {
            toggleState.valueChangedEvent.removeListener(valueListenerId);
            toggleState.propertiesChangedEvent.removeListener(propertiesListenerId);
        };
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        toggleState.setValue(event.currentTarget.checked);
        setChecked(event.currentTarget.checked);
    };

    useEffect(() => {
        console.log(checked);
    }, [checked]);

    return (
        <label className="flex items-center">
            <input
                className="appearance-none"
                ref={toggle}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />

            <svg
                className={`w-6 cursor-pointer rounded-full shadow-lg shadow-black outline-dotted outline-2 outline-transparent hover:outline-emerald-400 ${checked ? "bg-blue-900" : "bg-white"}`}
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    className={`${checked ? "fill-blue-400" : "fill-black"}`}
                    x="186.056"
                    y="17"
                    width="24"
                    height="275"
                    rx="8"
                    transform="rotate(20 186.056 17)"
                    fill="black"
                />
                <circle
                    className={`${checked ? "stroke-blue-400" : "stroke-black"}`}
                    cx="150"
                    cy="150"
                    r="88"
                    stroke="black"
                    strokeWidth="24"
                />
            </svg>
        </label>
    );
}
