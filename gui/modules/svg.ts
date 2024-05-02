export default (rawSvg: string) => {
    return `data:image/svg+xml,${encodeURIComponent(rawSvg)}`;
};
