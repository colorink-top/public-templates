import * as idbKey from '../../../../libs/idb-keyval.js'

const stampStore = idbKey.createStore('stamp-store',  'stamp')


const DEFAULTSTAMPURLKEY = 'custom-stamp-default-url'
const prefix = 'jopp://'
const createId = ()=> prefix + Date.now()

export const uploadStampFn = (callback)=>{
  const fileInput = document.createElement('input')
  fileInput.setAttribute('type', 'file')
  fileInput.style.display = 'none';
  document.body.append(fileInput)
  fileInput.onchange = async ()=>{
    const file = fileInput.files[0];
    const type = file.type;
    if (!/^image\//i.test(type)) {
      alert('Only image files can be uploaded.');
      return
    }
    const fileId = createId()
    const keys = await idbKey.keys(stampStore)
    if (keys.length > 20) {
      await idbKey.clear(stampStore)
    }
    await idbKey.set(fileId, {
      file
    }, stampStore)
    callback(fileId)
  }
  fileInput.click()
}

export const setDefaultStampIdFn = (id='')=>{
  localStorage.setItem(DEFAULTSTAMPURLKEY, id.trim())
}

export const getDefaultStampIdFn = ()=>{
  return localStorage.getItem(DEFAULTSTAMPURLKEY) || ''
}

export const getStampURLFn = async (id='')=>{
  id = id || getDefaultStampIdFn()
  if (!id) return ''
  if (!id.startsWith(prefix)) return id;
  const stampInfo = await idbKey.get(id, stampStore)
  if (stampInfo) {
    const url = window.URL.createObjectURL(stampInfo.file)
    return url
  }
  return ''
}
