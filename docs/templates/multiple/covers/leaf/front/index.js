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

window.joppInit = async (opts) => {
  console.log(opts)
  const { documentInfo } = opts;
  const { url, origin } = documentInfo;
  const { title, subtitle, author } = getArticleInfo(opts);
  const titleEl = document.querySelector('.jopp-doc-title');
  const subtitleEl = document.querySelector('.jopp-doc-subtitle');
  const authorEl = document.querySelector('.jopp-doc-author')
  titleEl.innerText = title;
  subtitleEl.innerHTML = ''
  if (subtitle === '{{url}}') {
    const linkEl = document.createElement('a')
    linkEl.href = url
    linkEl.innerText = origin;
    subtitleEl.append(linkEl)
  } else {
    subtitleEl.innerText = subtitle
  }
  authorEl.innerText = author
};
