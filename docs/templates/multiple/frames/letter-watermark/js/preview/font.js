
const defaultPreviewLetter = `abcdefghijklmn...hello Just One Page PDF...`
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const getTrustedHTMLFn = (str)=>{
  const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
    createHTML: (to_escape) => to_escape
  })
  return escapeHTMLPolicy.createHTML(str)
}
export const selectLocalFontFn = async (previewLetter) => {
  previewLetter = previewLetter || defaultPreviewLetter
  const availableFonts = await window.queryLocalFonts(); // 列出所有可用的字体
  const _families = availableFonts.map((fontData) => fontData.family);
  const families = [...new Set(_families)]; // 去重
  const familyHtmls = families.map((family) => {
    const _family = escapeHTML(family);
    return `<option value="${_family}">${_family}</option>`;
  });
  const root = document.body;
  root.querySelectorAll("dialog").forEach((el) => el.remove());
  const dialogEl = document.createElement("dialog");
  dialogEl.innerHTML = getTrustedHTMLFn(`
            <div class="select-fonts-dialog-container dialog-container">
              <div class="select-fonts-container content-container">
                <div class="select-fonts-list">
                <select class="select-fonts-list-selector" name="systemFont" size=10>
                  ${familyHtmls.join("")}
                </select>
                </div>
                <iframe class="font-preview-iframe" frameborder="0"></iframe>
              </div>
              <div class="select-fonts-btns footer-btns">
                <div class="right-footer-btns">
                  <button class="cancel-btn btn">cancel</button>
                  <button class="ok-btn btn">ok</button>
                </div>
              </div>
            </div>
          `);
  root.append(dialogEl);
  dialogEl.showModal();
  dialogEl.oncancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const selectorEl = dialogEl.querySelector(".select-fonts-list-selector");
  selectorEl.onchange = ()=>{
    const selectFont = selectorEl.value
    const _doc = previewIframeEl.contentDocument;
    const fontStyleEl = _doc.querySelector('.font-style')
    fontStyleEl.innerHTML = `body{
      font-family: '${selectFont}', serif;
    }`
  }

  const previewIframeEl = dialogEl.querySelector(".font-preview-iframe");
  previewIframeEl.srcdoc = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title></title>
            <style>
*{
  box-sizing: border-box;
}
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.font-preview-content{
    font-size: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
}
            </style>
            <style class="font-style"></style>
          </head>
          <body>
             <div class="font-preview-content" contenteditable>
                  ${previewLetter}
             </div>
          </body>
          </html>
          `;
  return new Promise((resolve, reject)=>{
    dialogEl.querySelector(".cancel-btn").onclick = () => {
      dialogEl.remove();
      resolve()
    };
    dialogEl.querySelector(".ok-btn").onclick = () => {
      let selectedFontFamilly = ''
      if (selectorEl.value) {
        selectedFontFamilly = selectorEl.value;
      }
      dialogEl.remove();
      resolve(selectedFontFamilly)
    };
  })
};
