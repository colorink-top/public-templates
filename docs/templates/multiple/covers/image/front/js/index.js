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
  console.log(opts)
  const { documentInfo, templateInfo={} } = opts;
  const { url, origin } = documentInfo;
  const imageContext = getArticleInfo(opts);
  const imageOpts = Object.assign({}, defaultImageOptions, getOptionsFn(), templateInfo.options)
  const imageURL =await getImageURLFn(imageOpts.id);
  const titleTemp = _.template(imageOpts.title || '');
  const titleText = titleTemp(imageContext)
  const subtitleTemp = _.template(imageOpts.subtitle || '');
  const subtitleText = subtitleTemp(imageContext);
  const authorTemp = _.template(imageOpts.author || '')
  const authorText = authorTemp(imageContext);

  const rootEl = document.documentElement;
  const titleEl = document.querySelector('.jopp-doc-title');
  const subtitleEl = document.querySelector('.jopp-doc-subtitle');
  const authorEl = document.querySelector('.jopp-doc-author')
  const imageCoverEl = document.querySelector('.image-cover');
  rootEl.style.setProperty('--color', imageOpts.color)
  imageCoverEl.src = imageURL || '../mind.svg';
  titleEl.innerText = titleText;

  if (!!imageOpts.strokeTitle) {
    titleEl.classList.add('stroke-text')
  } else {
    titleEl.classList.remove('stroke-text')
  }

  subtitleEl.innerHTML = ''
  if (subtitleText === '{{url}}') {
    const linkEl = document.createElement('a')
    linkEl.href = url
    linkEl.innerText = origin;
    subtitleEl.append(linkEl)
  } else {
    subtitleEl.innerText = subtitleText
  }

  authorEl.innerText = authorText
};



const url = new URL(document.location.href);
const joppPreview = url.searchParams.get('joppPreview')
if (joppPreview) {
// javascript-obfuscator:disable
  import('./preview/index.js')
// javascript-obfuscator:enable
}
