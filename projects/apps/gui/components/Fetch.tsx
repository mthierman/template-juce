import { useEffect, useState } from "react";

export default function Fetch() {
    const [apiData, setApiData] = useState(null);
    useEffect(() => {
        (async function fetchApiData() {
            const response = await fetch(
                "https://api.github.com/repos/baconpaul/airwin2rack/git/refs/tags/DAWPlugin",
            );
            const data = await response.json();
            console.log(data);
            setApiData(data);
        })();
    }, []);

    return (
        <>
            {apiData && (
                <>
                    <p>{apiData.object.sha}</p>
                    <p>
                        <a className="text-red-400 underline" href={apiData.url}>
                            {apiData.url}
                        </a>
                    </p>
                </>
            )}
        </>
    );
}
