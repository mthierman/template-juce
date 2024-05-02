import { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as Juce from "juce-framework-frontend";

import svg from "modules/svg";
import phase_toggle from "images/phase_toggle.svg?raw";

const phaseToggleSvg = {
    default: svg(phase_toggle),
};

export default function InvertPhaseToggle() {
    const invertPhaseToggle = useRef<HTMLInputElement | null>(null);
    const [phase, setPhase] = useState(false);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const svgRectRef = useRef<SVGRectElement | null>(null);

    svgRef.current?.setAttribute("fill", "red");
    svgRectRef.current?.setAttribute("fill", "red");

    const phaseState = Juce.getToggleState("invertPhase");

    useEffect(() => {
        console.log(phaseState);
    }, []);

    const handleInvertPhaseChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setPhase(target.checked);
    };

    useEffect(() => {
        console.log(phase);
    }, [phase]);

    return (
        <label>
            <input
                ref={invertPhaseToggle}
                id="invert-phase-toggle"
                type="checkbox"
                checked={phase}
                onChange={handleInvertPhaseChange}
            />
            <img src={phaseToggleSvg.default} draggable={false} />

            <svg
                ref={svgRef}
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    ref={svgRectRef}
                    x="186.056"
                    y="17"
                    width="24"
                    height="275"
                    rx="8"
                    transform="rotate(20 186.056 17)"
                    fill="black"
                />
                <circle cx="150" cy="150" r="88" stroke="black" stroke-width="24" />
            </svg>
        </label>
    );
}
