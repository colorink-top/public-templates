window.joppInit = async function (opts) {
  const { templateInfo, documentInfo, pdfInfo } = opts;
  const linkEl = document.querySelector(".page-link");
  linkEl.innerText = documentInfo.hostname;
  linkEl.href = documentInfo.url;
  const titleEl = document.querySelector(".title");
  titleEl.innerText = documentInfo.title;
  const dateEl = document.querySelector(".date");
  dateEl.innerText = new Date().toLocaleString();
};
