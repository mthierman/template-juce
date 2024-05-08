import * as Juce from "juce-framework-frontend";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import tailwindConfig from "root/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig.js";

const tailwind = resolveConfig(tailwindConfig).theme.colors;

export default function InvertPhaseToggle() {
    const invertPhaseToggle = useRef<HTMLInputElement | null>(null);
    const [phase, setPhase] = useState(false);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const svgRectRef = useRef<SVGRectElement | null>(null);
    const svgCircleRef = useRef<SVGCircleElement | null>(null);

    // https://www.geeksforgeeks.org/how-to-change-svg-icon-color-on-click-in-javascript/
    // svgRef.current?.setAttribute("fill", "red");
    // svgRectRef.current?.setAttribute("fill", "red");

    const phaseState = Juce.getToggleState("invertPhase");

    const handleInvertPhaseChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setPhase(target.checked);
    };

    useEffect(() => {
        console.log(phase);
    }, [phase]);

    return (
        <label className="flex">
            <input
                className="appearance-none"
                ref={invertPhaseToggle}
                id="invert-phase-toggle"
                type="checkbox"
                checked={phase}
                onChange={handleInvertPhaseChange}
            />

            <svg
                ref={svgRef}
                className={`w-8 cursor-pointer rounded-full shadow-lg shadow-black ${phase ? "bg-gray-800" : "bg-gray-200"}`}
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    ref={svgRectRef}
                    className={`group-hover:fill-emerald-400 dark:group-hover:fill-emerald-600 ${phase ? "fill-blue-400" : "fill-black"}`}
                    x="186.056"
                    y="17"
                    width="24"
                    height="275"
                    rx="8"
                    transform="rotate(20 186.056 17)"
                    fill="black"
                />
                <circle
                    ref={svgCircleRef}
                    className={`group-hover:stroke-emerald-400 dark:group-hover:stroke-emerald-600 ${phase ? "stroke-blue-400" : "stroke-black"}`}
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
