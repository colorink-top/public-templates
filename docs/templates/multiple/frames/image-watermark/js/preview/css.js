
export const initPreviewCssFn =  ()=>{
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
  .jopp-preview .page-container{
   outline: 2px solid;
   outline-offset: -3px;
  }
  `
  document.head.append(styleEl);
  document.body.classList.add('jopp-preview')
  document.body.style.setProperty('--height', '500px', 'important')
}
