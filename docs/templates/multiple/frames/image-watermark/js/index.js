import { demoData } from "../../demo-data.js";
import { defaultWatermarkOptions, getOptionsFn, getImageURLFn } from './options.js'

window.joppInit = async (opts = demoData) => {
  console.log(opts)
  const { pdfInfo, documentInfo, templateInfo={} } = opts
  const { pages, width, height, margin } = pdfInfo

  const tocPages = pages.filter((page)=> page.type === 'toc')
  const contentPages = pages.filter((page)=> page.type === 'content')
  const totalTocPage = tocPages.length;
  const totalContentPage = contentPages.length;

  const rootEl = document.documentElement;
  rootEl.style.setProperty('--marginTop', margin.top + 'px')
  rootEl.style.setProperty('--marginRight', margin.right + 'px')
  rootEl.style.setProperty('--marginBottom', margin.bottom + 'px')
  rootEl.style.setProperty('--marginLeft', margin.left + 'px')
  rootEl.style.setProperty('--width', width + 'px')
  rootEl.style.setProperty('--height', height + 'px')
  const watermarkOpts = Object.assign({}, defaultWatermarkOptions, getOptionsFn(), templateInfo.options)
  const imageURL =await getImageURLFn(watermarkOpts.id)
  document.querySelectorAll('.pages-container').forEach((el)=> el.remove())

  const templateEl = document.querySelector('.template')
  templateEl.style.display = 'none'
  const pagesEl = document.createElement('div')
  pagesEl.classList.add('pages-container');
  const now = new Date();

  let contentPageNum = 0;
  let tocPageNum = 0;
  pages.forEach((page, _index)=>{
    const pageEl = templateEl.cloneNode(true);
    pageEl.style.removeProperty('display');
    pageEl.className = 'page-container'
    switch (page.type) {
      case "toc": {
        tocPageNum++
        pageEl.innerHTML = '';
        pageEl.classList.add('toc-page-container');
        pagesEl.append(pageEl);
        break
      }
      case "content": {
        contentPageNum++
        pageEl.classList.add('content-page-container');
        const sectionEl = pageEl.querySelector('.header .section');
        sectionEl.innerText = page?.section1 || '';
        const hostnameEl = pageEl.querySelector('.footer .hostname a');
        hostnameEl.innerText = documentInfo.hostname;
        hostnameEl.href = documentInfo.url;
        const pageNumEl = pageEl.querySelector('.footer .page-num');
        pageNumEl.innerText = `${contentPageNum}/${totalContentPage}`;
        const dateEl = pageEl.querySelector('.footer .date');
        dateEl.innerText = now.toString();
        const createdWithEl = pageEl.querySelector('.created-with')
        createdWithEl.style.visibility = !!watermarkOpts.hideSaveDate ? 'hidden': 'visible';
        const headerEl = pageEl.querySelector('.header')
        headerEl.style.visibility = !!watermarkOpts.hideHeader ? 'hidden': 'visible';
        const footerEl = pageEl.querySelector('.footer')
        footerEl.style.visibility = !!watermarkOpts.hideFooter ? 'hidden': 'visible';
        pagesEl.append(pageEl);
        const imageWatermarkEl = pageEl.querySelector('.image-watermark')
        imageWatermarkEl.style.setProperty('--watermarkSize', watermarkOpts.size + 'px')
        imageWatermarkEl.style.setProperty('--watermarkOpacity', watermarkOpts.opacity)
        imageWatermarkEl.style.setProperty('--watermarkAngle', watermarkOpts.angle + 'deg')
        imageWatermarkEl.style.setProperty('--watermarkX', watermarkOpts.x + '%')
        imageWatermarkEl.style.setProperty('--watermarkY', watermarkOpts.y + '%')
        imageWatermarkEl.src = imageURL || './jopp.svg'
        break
      }
      default:{
        pageEl.classList.add('other-page-container');
        pageEl.innerHTML = '';
        pagesEl.append(pageEl);
        break
      }
    }
  })
  document.body.append(pagesEl)
};



const url = new URL(document.location.href);
const joppPreview = url.searchParams.get('joppPreview')
if (joppPreview) {
// javascript-obfuscator:disable
  import('./preview/index.js')
// javascript-obfuscator:enable
}
