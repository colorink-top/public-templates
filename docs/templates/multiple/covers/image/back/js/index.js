import { demoData } from "../../../demo-data.js";
import { defaultImageOptions, getOptionsFn, getImageURLFn } from './options.js'

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};



const getArticleInfo = (opts=demoData) => {
  let title = opts.documentInfo.title;
  let subtitle = ``;
  let author = ``;
  if (opts?.articleContext?.articleInfo) {
    const { articleInfo } = opts.articleContext;
    title = articleInfo.title || title;
    subtitle = articleInfo.subtitle || "";
    author = articleInfo.author || author;
  }
  return { ...opts.documentInfo,  title, subtitle, author };
};


window.joppInit = async (opts) => {
  const { documentInfo, templateInfo={} } = opts;

  const imageContext = getArticleInfo(opts);
  const imageOpts = Object.assign({}, defaultImageOptions, getOptionsFn(), templateInfo.options)
  const imageURL =await getImageURLFn(imageOpts.id);

  const tableEl = document.querySelector('.jopp-doc-detail-table')
  if (imageOpts.hideDetail) {
    tableEl.style.display = 'none';
  } else {
    tableEl.style.display = '';
  }

  const titleEl = document.querySelector('.jopp-table-title')
  const saveDateEl = document.querySelector('.jopp-table-save-date')
  const sourceLinkEl = document.querySelector('.jopp-table-link>a')
  titleEl.innerText = documentInfo.title;
  saveDateEl.innerText = new Date().toLocaleString();
  sourceLinkEl.href = documentInfo.url;
  sourceLinkEl.innerText = documentInfo.url;

  const imageCoverEl = document.querySelector('.image-cover');
  imageCoverEl.src = imageURL || '../mind.svg';
  const rootEl = document.documentElement;
  rootEl.style.setProperty('--color', imageOpts.color)
};


const url = new URL(document.location.href);
const joppPreview = url.searchParams.get('joppPreview')
if (joppPreview) {
// javascript-obfuscator:disable
  import('./preview/index.js')
// javascript-obfuscator:enable
}
