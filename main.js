function stitch() {

}

function handleUpload(files) {
    // console.log(files)
    const pics = document.getElementById("pics");

    // let height=0, width=0;
    for (let i = 0; i < files.length; i++) {
        const img = files[i];
        // console.log(img);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        // console.log(reader);
        reader.onload = e => {
            // console.log("DONE")
            const imgURL = reader.result;
            const imgEl = document.createElement("img");
            imgEl.src = imgURL;
            pics.appendChild(imgEl);
        }

    }
}

function drawPic() {    
    const pics = document.getElementById("pics").children;
    let height = 0, width = 0, maxHeight = 0, maxWidth = 0;
    for(let i = 0;i<pics.length; i++) {
        height += pics[i].naturalHeight;
        width += pics[i].naturalWidth;

        // 临时
        maxHeight = pics[i].naturalHeight > maxHeight ? pics[i].naturalHeight : maxHeight;
        maxWidth = pics[i].naturalWidth > maxWidth ? pics[i].naturalWidth : maxWidth;

    }
    
    const canvas = document.getElementById("canvas");
    canvas.width = width;
    // canvas.height = height;
    canvas.height = maxHeight;//临时

    const context = canvas.getContext("2d");
    for(let i = 0,x=0,y=0;i<pics.length; i++) {
        context.drawImage(pics[i],x,y);
        // height += pics[i].naturalHeight;
        // width += pics[i].naturalWidth;
        x += pics[i].naturalWidth;
    }

    exportCanvasAsPNG('canvas', '拼接');
}

function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}