import GUI from '../../../../../libs/lil-gui.min.js'
import { saveAs } from '../../../../../libs/FileSaver.js'
import { initPreviewCssFn } from './css.js'
import { demoData } from "../../../demo-data.js";
import { uploadStampFn, setDefaultStampIdFn, getDefaultStampIdFn } from '../stamp.js'

const stampExamples = {}

const initOpts = demoData

const optionsParams = {}

function refreshJoppInitJSON(){
  Object.assign(initOpts.templateInfo, {
    name: optionsParams.name,
  }, {
    options: {
      stampURL: optionsParams.stampURL
    }
  })
  return initOpts
}

async function applyJoppInit() {
  refreshJoppInitJSON()
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
  const gui = new GUI();
  Object.assign(optionsParams, {
    name: templateInfo.name,
    uploadStamp: ()=>{
      uploadStampFn((stampId)=>{
        stampURLController.setValue(stampId)
      })
    },
    stampURL: templateInfo.options?.stampURL || getDefaultStampIdFn(),
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


  gui.add({preset: ''}, 'preset', Object.keys(stampExamples)).onChange((v)=>{
    const stampInfo = stampExamples[v]
    if (stampInfo) {
      stampURLController.setValue(stampInfo.url)
    }
  })
  gui.add(optionsParams, 'uploadStamp');
  const stampURLController = gui.add(optionsParams, 'stampURL').onChange(()=>{
    setDefaultStampIdFn(optionsParams.stampURL)
    applyJoppInit()
  })
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
