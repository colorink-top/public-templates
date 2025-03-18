window.joppInit = async (opts) => {
  const { documentInfo } = opts;
  const titleEl = document.querySelector('.jopp-table-title')
  const saveDateEl = document.querySelector('.jopp-table-save-date')
  const sourceLinkEl = document.querySelector('.jopp-table-link>a')
  titleEl.innerText = documentInfo.title;
  saveDateEl.innerText = new Date().toLocaleString();
  sourceLinkEl.href = documentInfo.url;
  sourceLinkEl.innerText = documentInfo.url;
};
