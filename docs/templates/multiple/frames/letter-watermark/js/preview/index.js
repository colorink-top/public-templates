import GUI from '../../../../../libs/lil-gui.min.js'
import { saveAs } from '../../../../../libs/FileSaver.js'
import { initPreviewCssFn } from './css.js'
import { demoData } from "../../../demo-data.js";
import { defaultWatermarkOptions, saveOptionsFn, getOptionsFn } from '../options.js'
import { selectLocalFontFn } from './font.js'

const initOpts = demoData

const optionsParams = {}

function refreshJoppInitJSON(){
  Object.assign(initOpts.templateInfo, {
    name: optionsParams.name,
  }, {
    options: {
      letter: optionsParams.letter,
      fontFamily: optionsParams.fontFamily,
      fontSize: optionsParams.fontSize,
      letterSpacing: optionsParams.letterSpacing,
      opacity: optionsParams.opacity,
      color: optionsParams.color,
      angle: optionsParams.angle,
      x: optionsParams.x,
      y: optionsParams.y,
      hideSaveDate: optionsParams.hideSaveDate,
      hideHeader: optionsParams.hideHeader,
      hideFooter: optionsParams.hideFooter
    }
  })
  return initOpts
}

async function applyJoppInit() {
  refreshJoppInitJSON()
  saveOptionsFn(initOpts.templateInfo.options);
  await window.joppInit(initOpts);
}

function getJoppPreviewPath(url){
  url = url || new URL(document.location.href);
  const path = url.searchParams.get('joppPreview')
  if (!path) return; // 没有值，直接返回空
  const { origin, pathname} = url;
  if (/^http[s]?:\/\//i.test(path)) return path // 带有协议的路径，直接访问
  if (/^true$/i.test(path)) {
    //if (!pathname) return origin + '/template.json'; // 空路径
    //if (/\/$/.test(pathname)) return origin + pathname + 'template.json'; // 路径以 /结尾
    return origin + pathname.substring(0, pathname.lastIndexOf('/')) + '/template.json'
  } else {
    if (/^\//.test(path)) return origin + path; // 以 / 开头的路径，做为绝对路径
    return origin + pathname.substring(0, pathname.lastIndexOf('/')) + '/' + path;
  }
}

function initGUI(){
  const { templateInfo } = initOpts;
  const options = Object.assign({}, defaultWatermarkOptions, getOptionsFn(), templateInfo.options)
  const gui = new GUI();
  Object.assign(optionsParams, {
    name: templateInfo.name,
    letter: options.letter || '',
    fontFamily: options.fontFamily || '',
    fontSize: parseInt(options.fontSize) || 10,
    letterSpacing: parseInt(options.letterSpacing) || 0,
    opacity: parseFloat(options.opacity) || 0.3,
    color: options.color || 'black',
    angle: parseInt(options.angle) || 45,
    x: parseInt(options.x) || 0,
    y: parseInt(options.y) || 0,
    hideSaveDate: !!options.hideSaveDate,
    hideHeader: !!options.hideHeader,
    hideFooter: !!options.hideFooter,
    selectFont: ()=>{
      selectLocalFontFn(optionsParams.letter).then((fontFamily)=>{
        fontFamilyController.setValue(fontFamily);
      })
    },
    resetDefault: ()=>{
      Object.assign(optionsParams, defaultWatermarkOptions, {name: 'Letter Watermark'})
      applyJoppInit();
      const controllers = gui.controllersRecursive()
      controllers.forEach((c)=> c.updateDisplay())
    },
    downloadJSON: ()=>{
      const newInitOpts = refreshJoppInitJSON()
      const path = getJoppPreviewPath();
      const blob = new Blob([JSON.stringify({
        ...newInitOpts.templateInfo,
        path,
        template_version: 1,
      }, null, 2)], {type: "text/plain;charset=utf-8"})
      saveAs(blob, optionsParams.name + '_template.json')
      console.log('download json:::', gui.save(), optionsParams)
    }
  }, templateInfo.options)

  gui.add(optionsParams, 'name').onChange(applyJoppInit)
  gui.add(optionsParams, 'letter').onChange(applyJoppInit)
  gui.add(optionsParams, 'selectFont');
  const fontFamilyController = gui.add(optionsParams, 'fontFamily').onChange(applyJoppInit)
  gui.add(optionsParams, 'fontSize', 5, 50).onChange(applyJoppInit)
  gui.add(optionsParams, 'letterSpacing', 0, 50).onChange(applyJoppInit)
  gui.add(optionsParams, 'opacity', 0, 1).onChange(applyJoppInit);
  gui.addColor(optionsParams, 'color').onChange(applyJoppInit);
  gui.add(optionsParams, 'angle', 0, 360).onChange(applyJoppInit)
  gui.add(optionsParams, 'x', -50, 50, 1).onChange(applyJoppInit)
  gui.add(optionsParams, 'y', -50, 50, 1).onChange(applyJoppInit)
  gui.add(optionsParams, 'hideSaveDate').onChange(applyJoppInit)
  gui.add(optionsParams, 'hideHeader').onChange(applyJoppInit)
  gui.add(optionsParams, 'hideFooter').onChange(applyJoppInit)
  gui.add(optionsParams, 'resetDefault')
  gui.add(optionsParams, 'downloadJSON')
}


(async function preview() {
  const joppPreview = getJoppPreviewPath();
  if (joppPreview) {
    const req = await fetch(joppPreview)
    const templateInfo = await req.json()
    const margin = templateInfo.margin || {}
    Object.assign(initOpts, {
      templateInfo,
    })
    await joppInit(initOpts);
    initGUI()
    initPreviewCssFn();
  }
})();
