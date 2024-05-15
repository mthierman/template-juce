import "css/index.css";
import { applyTheme, loadTheme } from "modules/theme";
import { useEffect, useState } from "react";

const trackList = [
    "Prelude to Stranded",
    "Fever Dream",
    "Changes",
    "Sun",
    "Stranded",
    "25 Notes",
    "Island Time",
    "Island Time Afterlude",
    "Landed",
];

export default function App() {
    const [theme, setTheme] = useState(loadTheme());

    applyTheme(theme);

    useEffect(() => {
        const themeChange = () => {
            if (theme === "system") {
                applyTheme(theme);
            }
        };

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", themeChange);

        return () => {
            mql.removeEventListener("change", themeChange);
        };
    }, []);

    return (
        <>
            <ol className="min-w-48 overflow-y-auto overflow-x-hidden bg-yellow-400 p-4 leading-tight">
                {trackList.map((track, index) => (
                    <li className="">{`${index.toString().padStart(2, "0")}. ${track}`}</li>
                ))}
            </ol>
            <img
                className="aspect-square shadow-2xl m-auto max-w-96 shadow-black"
                src="https://f4.bcbits.com/img/a2157581263_10.jpg"
                draggable={false}
            />
        </>
    );
}
