import "css/index.css";
import { applyTheme, loadTheme } from "modules/theme";
import { useEffect, useState } from "react";

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
        <div className="grid size-full grid-flow-col grid-cols-2">
            <div className=""></div>
            <div className="m-auto">
                <img
                    className="size-96 min-w-96 aspect-square shadow-2xl shadow-black"
                    src="https://f4.bcbits.com/img/a2157581263_10.jpg"
                    draggable={false}
                />
            </div>
        </div>
    );
}
