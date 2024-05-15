import "css/index.css";
import { useEffect, useRef, useState } from "react";

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
    const cover = useRef<HTMLDivElement | null>(null);
    const coverImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = coverImage.current;
        img.onload = () => {
            console.log(img.src);
            const ctx = document.createElement("canvas").getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(img, 0, 0, 4, 4);
            const i = ctx.getImageData(0, 0, 1, 1).data;
            console.log(i);
            const rgba = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`;
            const HEX = "#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
            // cover.current.style.backgroundColor = HEX;
            document.body.style.backgroundColor = HEX;
        };
    }, [coverImage.current]);

    return (
        <>
            <div id="tracks">
                <ol id="tracklist">
                    {tracks.map((track, index) => (
                        <li key={index} className="track">
                            {track}
                        </li>
                    ))}
                </ol>
            </div>
            <div id="cover" ref={cover}>
                <img
                    ref={coverImage}
                    id="cover-image"
                    // src="/a1101171123_10.jpg"
                    // src="/a2157581263_10.jpg"
                    src="/funhouse_50.jpg"
                    draggable={false}
                />
            </div>
        </>
    );
}
