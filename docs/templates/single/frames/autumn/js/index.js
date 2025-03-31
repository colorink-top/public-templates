const headerEl = document.querySelector(".header");
const bodyEl = document.querySelector(".body");
const footerEl = document.querySelector(".footer");
const footerBackgroundEl = document.querySelector(".footer-background");

window.joppInit = async function (opts) {
  const { templateInfo, documentInfo, pdfInfo } = opts;
  document.body.classList.add('print') // display flex will cause layout bug when print pdf.
  const saveDate = new Date();
  headerEl.classList.add("hide");
  bodyEl.classList.add("hide");
  footerEl.classList.add("hide");
  footerBackgroundEl.classList.add('hide');
  switch (templateInfo.region) {
    case "header": {
      headerEl.classList.remove("hide");
      const linkEl = headerEl.querySelector('.page-link')
      linkEl.innerText = documentInfo.hostname;
      linkEl.href = documentInfo.url;
      break;
    }
    case "footer": {
      footerEl.classList.remove("hide");
      footerBackgroundEl.classList.remove('hide');
      const timeEl = document.querySelector('.footer time')
      timeEl.innerText = saveDate.toLocaleString();
      break;
    }
  }
};
