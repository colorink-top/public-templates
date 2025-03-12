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
    <div class="jopp-front-cover jopp-cover pdf-cover">
      <div class="jopp-doc-title">${_.escape(title)}</div>
      <div class="jopp-doc-subtitle">${
        subtitle != "{{url}}"
          ? _.escape(subtitle)
          : `<a href="${encodeURI(url)}" target="_blank">${_.escape(
              origin
            )}</a>`
      }</div>
      <p class="jopp-doc-author">${_.escape(author)}</p>
    </div>
    <div class="jopp-front-cover jopp-cover pdf-cover">
      <div class="jopp-doc-title">${_.escape(title)}</div>
      <div class="jopp-doc-subtitle">${
        subtitle != "{{url}}"
          ? _.escape(subtitle)
          : `<a href="${encodeURI(url)}" target="_blank">${_.escape(
              origin
            )}</a>`
      }</div>
      <p class="jopp-doc-author">${_.escape(author)}</p>
    </div>
    <div class="jopp-front-cover jopp-cover pdf-cover">
      <div class="jopp-doc-title">${_.escape(title)}</div>
      <div class="jopp-doc-subtitle">${
        subtitle != "{{url}}"
          ? _.escape(subtitle)
          : `<a href="${encodeURI(url)}" target="_blank">${_.escape(
              origin
            )}</a>`
      }</div>
      <p class="jopp-doc-author">${_.escape(author)}</p>
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
