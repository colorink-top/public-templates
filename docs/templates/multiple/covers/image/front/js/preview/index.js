import GUI from '../../../../../../libs/lil-gui.min.js'
import { saveAs } from '../../../../../../libs/FileSaver.js'
import { initPreviewCssFn } from './css.js'
import { demoData } from "../../../../demo-data.js";
import { defaultImageOptions, saveOptionsFn, getOptionsFn, uploadImageFn } from '../options.js'

const initOpts = demoData

const optionsParams = {}

function refreshJoppInitJSON(){
  Object.assign(initOpts.templateInfo, {
    name: optionsParams.name,
  }, {
    options: {
      id: optionsParams.url,
      color: optionsParams.color,
      title: optionsParams.title,
      strokeTitle: optionsParams.strokeTitle,
      subtitle: optionsParams.subtitle,
      author: optionsParams.author
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
  const options = Object.assign({}, defaultImageOptions, getOptionsFn(), templateInfo.options)
  const gui = new GUI();
  Object.assign(optionsParams, {
    name: templateInfo.name,
    url: options.id || '',
    color: options.color || 'black',
    title: options.title || '',
    strokeTitle: !!options.strokeTitle,
    subtitle: options.subtitle || '',
    author: options.author || '',
    uploadImage: ()=>{
      uploadImageFn((imageId)=>{
        imageIdController.setValue("" + imageId)
      })
    },
    resetDefault: ()=>{
      Object.assign(optionsParams, defaultImageOptions, {name: 'Image Cover'})
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
  gui.add(optionsParams, 'uploadImage');
  const imageIdController = gui.add(optionsParams, 'url').onChange(applyJoppInit)
  gui.addColor(optionsParams, 'color').onChange(applyJoppInit);
  gui.add(optionsParams, 'title').onChange(applyJoppInit)
  gui.add(optionsParams, 'strokeTitle').onChange(applyJoppInit)
  gui.add(optionsParams, 'subtitle').onChange(applyJoppInit)
  gui.add(optionsParams, 'author').onChange(applyJoppInit)
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
