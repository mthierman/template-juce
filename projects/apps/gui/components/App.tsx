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

const useColorFromImage = () => {
    const image = useRef<HTMLImageElement | null>(null);

    const colorFromImage = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Context is null");
        }

        context.imageSmoothingEnabled = true;
        context.drawImage(image.current!, 0, 0, 4, 4);

        const [r, g, b] = context.getImageData(0, 0, 1, 1).data;

        const color = new Color(`rgb(${r}, ${g}, ${b})`);

        color.darken(0.5);

        const hex = color.toString({ format: "hex" });

        document.body.style.backgroundColor = hex;
    };

    useEffect(() => {
        image.current?.addEventListener("load", colorFromImage);

        return () => {
            image.current?.removeEventListener("load", colorFromImage);
        };
    }, []);

    return image;
};

export default function App() {
    const cover = useRef<HTMLDivElement | null>(null);
    const coverImage = useColorFromImage();

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
