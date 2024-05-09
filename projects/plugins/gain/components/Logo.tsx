import { loadLogo } from "gain/modules/theme";
import { useEffect, useState } from "react";

export default function App() {
    const [logo, setLogo] = useState(loadLogo());

    useEffect(() => {
        const themeChange = () => {
            setLogo(loadLogo());
        };

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", themeChange);

        return () => {
            mql.removeEventListener("change", themeChange);
        };
    }, []);

    return (
        <div className="flex basis-full">
            <img className="mx-auto h-fit w-full select-none" src={logo} draggable="false" />
        </div>
    );
}
