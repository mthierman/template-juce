import { useEffect, useState } from "react";
import { loadLogo } from "root/gui/modules/theme";

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
        <div className="">
            <img className="select-none bg-green-400" src={logo} draggable="false" />
        </div>
    );
}
