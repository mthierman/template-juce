import { SyntheticEvent, useEffect, useRef, useState } from "react";
import * as Juce from "juce-framework-frontend";

export default function InvertPhaseToggle() {
    const invertPhaseToggle = useRef<HTMLInputElement | null>(null);
    const [phase, setPhase] = useState(false);

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
        </label>
    );
}
