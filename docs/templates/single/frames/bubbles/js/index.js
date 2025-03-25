const headerEl = document.querySelector(".header");
const bodyEl = document.querySelector(".body");
const footerEl = document.querySelector(".footer");

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


function generateBubbles(){
  const bubblesEl = document.querySelector('.bubbles')
  const bubbles = [];
  for( let i=0; i < 128; i++){
    const style = `--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`
    bubbles.push(`<div class="bubble" style="${style}"></div>`)
  }
  bubblesEl.innerHTML = bubbles.join('')
}

generateBubbles();

const qrcodeEl = document.querySelector('.qrcode')
// https://github.com/davidshimjs/qrcodejs
const qrcode = new QRCode(qrcodeEl, {
  text: 'https://chromewebstore.google.com/detail/fgbhbfdgdlojklkbhdoilkdlomoilbpl',
  width: 150,
  height: 150,
  //colorDark : '#000',
  colorDark : '#fff',
  //colorLight : '#fff',
  colorLight : '#ED5565',
  //colorLight : 'transparent',
});

window.joppInit = async function (opts) {
  const { templateInfo, documentInfo, pdfInfo } = opts;
  document.body.style.display = "block"; // display flex will cause layout bug when print pdf.
  const saveDate = new Date();
  headerEl.classList.add("hide");
  bodyEl.classList.add("hide");
  footerEl.classList.add("hide");
  switch (templateInfo.region) {
    case "header": {
      headerEl.classList.remove("hide");
      const linkEl = headerEl.querySelector('.page-link')
      linkEl.innerText = documentInfo.hostname;
      linkEl.href = documentInfo.url;
      break;
    }
    case "footer": {
      qrcode.clear();
      qrcode.makeCode(documentInfo.url);
      qrcodeEl.querySelector('canvas').remove()
      footerEl.classList.remove("hide");
      const timeEl = document.querySelector('.footer time')
      timeEl.innerText = saveDate.toLocaleString();
      const titleEl = document.querySelector('.footer .title');
      titleEl.innerText = documentInfo.title;
      break;
    }
  }
};
