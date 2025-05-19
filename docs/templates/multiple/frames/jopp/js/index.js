import { demoData } from "../../demo-data.js";

window.joppInit = async (opts = demoData) => {
  console.log(opts)
  const { pdfInfo, documentInfo } = opts
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

  const templateEl = document.querySelector('.template')
  templateEl.remove();
  const pagesEl = document.createElement('div')
  pagesEl.classList.add('.pages-container');
  const now = new Date();

  let contentPageNum = 0;
  let tocPageNum = 0;
  pages.forEach((page, _index)=>{
    const pageEl = templateEl.cloneNode(true);
    pageEl.className = 'page-container'
    switch (page.type) {
      case "toc": {
        tocPageNum++
        pageEl.classList.add('toc-page-container');
        pageEl.innerHTML = '';
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
        pagesEl.append(pageEl);
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
