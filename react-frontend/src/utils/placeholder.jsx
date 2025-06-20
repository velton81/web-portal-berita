const generatePlaceholderDataURL = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;

    const ctx = canvas.getContext("2d");

    // Fill background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = "#666666";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No Image Available", canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/jpeg");
};

export default generatePlaceholderDataURL;
