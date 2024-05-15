import "css/index.css";
import { useEffect, useState } from "react";

const tracks = [
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
    return (
        <>
            <div id="tracks">
                <ol id="tracklist">
                    {tracks.map((track, index) => (
                        <li className="">{`${index.toString().padStart(2, "0")}. ${track}`}</li>
                    ))}
                </ol>
            </div>
            <div id="cover">
                <img
                    id="cover-image"
                    src="https://f4.bcbits.com/img/a2157581263_10.jpg"
                    draggable={false}
                />
            </div>
        </>
    );
}
