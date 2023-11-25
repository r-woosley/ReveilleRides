export const getLighterColor = (color: string) => {
    // Parse the color components from the input string
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Increase the brightness of each color component
    const lightenedR = Math.min(r + 100, 255);
    const lightenedG = Math.min(g + 100, 255);
    const lightenedB = Math.min(b + 100, 255);

    // Convert the lightened color components back to a hex string
    const lightenedColor = (
        lightenedR.toString(16).padStart(2, '0') +
        lightenedG.toString(16).padStart(2, '0') +
        lightenedB.toString(16).padStart(2, '0')
    );

    return lightenedColor;
}