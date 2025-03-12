import { defaultData } from "../../../libs/default-data.js";

const getArticleInfo = (opts) => {
  let title = opts.documentInfo.title;
  let subtitle = `{{url}}`;
  let author = ``;
  if (opts?.articleContext?.articleInfo) {
    const { articleInfo } = opts.articleContext;
    title = articleInfo.title || title;
    subtitle = articleInfo.subtitle || "";
    author = articleInfo.author || author;
  }
  return { title, subtitle, author };
};

const generatorHtmlFn = (opts) => {
  const { title, subtitle, author } = getArticleInfo(opts);
  const { url, origin } = opts.documentInfo;

  const { documentInfo, articleContext } = opts;
  return `
    <div class="jopp-back-cover jopp-cover pdf-cover">
      <div class="header-container">
        <div class="header-img-container"><img class="logo-svg" src="./pdf_origin.svg" alt=""></div>
        <div id="fix-text" class="jopp-logo-text"></div>
      </div>
      <div class="jopp-logo-slogan">
         <p>
           <a href="https://chromewebstore.google.com/detail/fgbhbfdgdlojklkbhdoilkdlomoilbpl" class="content-szw-link">Just One Page PDF</a>, an awesome web page to pdf tool.
         </p>
       </div>
       <table class="jopp-doc-detail-table">
         <colgroup>
           <col span="1" style="min-width: 150px;">
          </colgroup>
         <tbody>
           <tr>
             <td>Title: </td>
             <td class="jopp-table-title">${_.escape(title)}</td>
           </tr>
           <tr>
             <td>Created By:</td>
             <td class="jopp-table-created-by"><a class="szw-link" href="https://chromewebstore.google.com/detail/just-one-page-pdf/fgbhbfdgdlojklkbhdoilkdlomoilbpl">SNW</a><span class="logo-text"></span></td>
           </tr>
           <tr>
             <td>Save Date:</td>
             <td class="jopp-table-save-date">${new Date().toLocaleString()}</td>
           </tr>
           <tr>
             <td>Source:</td>
             <td class="jopp-table-link"><a href="${_.escape(
               documentInfo.url
             )}">${_.escape(documentInfo.url)}</a></td>
           </tr>
         </tbody>
       </table>
    </div>
  `;
};

window.joppInit = async (opts = defaultData) => {
  const htmlStr = generatorHtmlFn(opts);
  const rootEl = document.createElement("div");
  rootEl.className = "pdf-container jopp-cover-container";
  document.body.append(rootEl);
  rootEl.innerHTML = htmlStr;
};

document.body.onload = ()=>{
  const searchParams = new URLSearchParams(document.location.search)
  if (!searchParams.has('joppPageVersion')) {
    joppInit();
  }
}
