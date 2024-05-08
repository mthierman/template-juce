import * as Juce from "juce-framework-frontend";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import tailwindConfig from "root/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig.js";

const tailwind = resolveConfig(tailwindConfig).theme.colors;

export default function InvertPhaseToggle() {
    const phaseToggle = useRef<HTMLInputElement | null>(null);
    const [phase, setPhase] = useState(false);

    const phaseState = Juce.getToggleState("invertPhase");

    const handlePhaseChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setPhase(target.checked);
    };

    useEffect(() => {
        console.log(phase);
    }, [phase]);

    return (
        <label className="flex items-center">
            <input
                className="appearance-none"
                ref={phaseToggle}
                type="checkbox"
                checked={phase}
                onChange={handlePhaseChange}
            />

            <svg
                className={`w-6 cursor-pointer rounded-full shadow-lg shadow-black outline-dotted outline-2 outline-transparent hover:outline-emerald-400 ${phase ? "bg-blue-900" : "bg-white"}`}
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    className={`${phase ? "fill-blue-400" : "fill-black"}`}
                    x="186.056"
                    y="17"
                    width="24"
                    height="275"
                    rx="8"
                    transform="rotate(20 186.056 17)"
                    fill="black"
                />
                <circle
                    className={`${phase ? "stroke-blue-400" : "stroke-black"}`}
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
