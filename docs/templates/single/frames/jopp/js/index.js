const headerEl = document.querySelector(".header");
const bodyEl = document.querySelector(".body");
const footerEl = document.querySelector(".footer");

const loadFontFn = async ()=>{
  var GideonRomanFont = new FontFace("xsjGideonRoman", "url(../../../fonts/GideonRoman-Regular.ttf)", {
    style: 'normal'
  });
  document.fonts.add(GideonRomanFont)

  var OswaldFont = new FontFace("xsjOswald", "url(../../../fonts/Oswald-Bold.ttf)", {
    style: 'normal'
  });
  document.fonts.add(OswaldFont)
  await GideonRomanFont.load();
  await OswaldFont.load();
}

window.joppInit = async function (opts) {
  const { templateInfo, documentInfo, pdfInfo } = opts;
  document.body.style.display = "block"; // display flex will cause layout bug when print pdf.
//  await loadFontFn();
  const saveDate = new Date();
  switch (templateInfo.region) {
    case "header": {
      bodyEl.classList.add("hide");
      footerEl.classList.add("hide");
      const linkEl = headerEl.querySelector('.page-link')
      linkEl.innerText = documentInfo.hostname.toUpperCase();
      linkEl.href = documentInfo.url;
      break;
    }
    case "footer": {
      headerEl.classList.add("hide");
      bodyEl.classList.add("hide");
      const timeEl = document.querySelector('.footer time')
      timeEl.setAttribute('datetime', saveDate.toISOString())
      timeEl.innerText = saveDate.toLocaleString();
      break;
    }
  }
};
