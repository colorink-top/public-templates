import { demoData } from '../demo-data.js'

const escapeHTML = (str)=>{
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const generatorTocHtmlFn = (outlines)=>{
  if (!outlines || outlines.length === 0) return ''
  let indent = 0;
  const list = outlines.map((outline)=>{
    //const level = entryHead[0] // 0 是headdepth
    const level = outline.sectionLevel // 3 是 sectiondepth
    const title = outline.title;
    const pageNum = outline.page;
    const targetLink = outline.link;

      let i = 0;
      let ldiff = 0;
      let res = [];
      if (level > indent) {
        ldiff = level - indent;
        i = 0;
        while (i < ldiff) {
          i++;
          res.push('<ul>');
          indent++;
        }
      } else if (level < indent) {
        ldiff = indent - level;
        i = 0;
        while (i < ldiff) {
          i++;
          res.push('</ul>');
          indent--;
        }
      }
    res = res.concat([`<li><div class="jopp-toc-item-text"><a href="${targetLink}">`, escapeHTML(title), `</a><span class="jopp-toc-item-page">${pageNum}</span></div>`]);
      return res.join('');
    return ``
  })
  return list.join('') + new Array(indent + 1).join('</ul>');
}

const getDefaultMargin = (val)=> val || 60

window.joppInit = async (opts=demoData) => {
  console.log(opts)
  const { documentInfo, pdfInfo } = opts;
  const { outlines, width, height, margin } = pdfInfo
  const rootEl = document.documentElement;
  rootEl.style.setProperty('--marginTop', getDefaultMargin(margin.top) + 'px')
  rootEl.style.setProperty('--marginRight', getDefaultMargin(margin.right) + 'px')
  rootEl.style.setProperty('--marginBottom', getDefaultMargin(margin.bottom) + 'px')
  rootEl.style.setProperty('--marginLeft', getDefaultMargin(margin.left) + 'px')


  const tocHtml = generatorTocHtmlFn(outlines);
  const htmlStr = `
       <div class="jopp-toc-title"></div>
       <div class="jopp-toc-content">
       ${tocHtml}
       </div>
  `
  document.querySelector('.toc-container').innerHTML = htmlStr;
};

joppInit();
