(_ => {
    const svgImport = document.querySelector("#svgImport");
    const linkOutput = document.querySelector("#linkOutput");
    const canvases = document.querySelector("#canvases");

    function changeExtension(name, newExtension) {
        const split = name.split(".");
        split[split.length - 1] = newExtension;
        return split.join(".");
    }

    svgImport.addEventListener("input", _ => {
        //console.log(changeExtension(svgImport.files[0].name, "png"));
        const file = svgImport.files[0];
        const image = document.createElement("img");
        image.addEventListener("load", _ => {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const context = canvas.getContext("2d");
            requestAnimationFrame(_ => {
                context.drawImage(image, 0, 0);
                const dataUrl = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.innerText = `Download ${changeExtension(file.name, "png")}`;
                a.href = dataUrl;
                a.download = changeExtension(file.name, "png");
                linkOutput.appendChild(a);
                canvases.appendChild(canvas);
            });
        }, {once: true});
        image.src = URL.createObjectURL(file);
    });
})();