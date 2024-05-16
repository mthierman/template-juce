import Color from "colorjs.io";
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

const colorFromImage = (image: HTMLImageElement) => {
    image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Context is null");
        }

        context.imageSmoothingEnabled = true;
        context.drawImage(image, 0, 0, 4, 4);

        const i = context.getImageData(0, 0, 1, 1).data;
        const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
        console.log(i);

        const rgba = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`;
        const HEX = "#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);

        document.body.style.backgroundColor = HEX;
    });
};

const colorToRgba = (color: string) => {
    const c = new Color(color);

    return {
        R: Math.round(c.r * 255),
        G: Math.round(c.g * 255),
        B: Math.round(c.b * 255),
        A: c.alpha,
    };
};

export default function App() {
    const cover = useRef<HTMLDivElement | null>(null);
    const coverImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = coverImage.current;
        colorFromImage(img);
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
