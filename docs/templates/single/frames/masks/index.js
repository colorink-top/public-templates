function processImage(img) {
  const canvas = document.querySelector(".canvas");
//  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext("2d");

  // Set canvas size to the image size
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  // Draw image on canvas
  ctx.drawImage(img, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Loop through every pixel and change white to transparent
  for (let i = 0; i < data.length; i += 4) {
    // White pixel (R:255, G:255, B:255)
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      data[i + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  // Put modified data back to canvas
  ctx.putImageData(imageData, 0, 0);

  // Show the processed image
  return canvas.toDataURL();
}


function convertAlphaImage(url){
  return new Promise(function(resolve, reject){
    const imgEl = document.createElement('img')
    imgEl.src = url
    imgEl.onload = ()=>{
      const dataUrl = processImage(imgEl)
      resolve(dataUrl)
    }

  })
}

window.joppInit = async function (opts={}) {
  const { frameInfo, documentInfo, pdfInfo } = opts;
  const {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    height,
  } = pdfInfo || {};
  const domImageEl = document.querySelector(".dom-image");
  const imgBlob = await domtoimage.toBlob(domImageEl, {
    bgcolor: "black",
    style: { width: "100%", height: "100%" },
  });
  const imgUrl = window.URL.createObjectURL(imgBlob);
  domImageEl.remove();
  const alphaUrl = await convertAlphaImage(imgUrl)
  console.log("imgURL:::", imgUrl);
  console.log('alpha url', alphaUrl)

  console.log("opts::::", opts);
};
