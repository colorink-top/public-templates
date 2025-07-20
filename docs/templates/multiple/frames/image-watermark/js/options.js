import * as idbKey from '../../../../libs/idb-keyval.js'

const imageStore = idbKey.createStore('image-store',  'image')


const DEFAULTSTAMPURLKEY = 'custom-image-default-url'
const prefix = 'jopp://'
const createId = ()=> prefix + Date.now()

export const uploadImageFn = (callback)=>{
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
    const keys = await idbKey.keys(imageStore)
    if (keys.length > 20) {
      await idbKey.clear(imageStore)
    }
    await idbKey.set(fileId, {
      file
    }, imageStore)
    callback(fileId)
  }
  fileInput.click()
}

export const getImageURLFn = async (id='')=>{
  if (!id) return ''
  if (!id.startsWith(prefix)) return id;
  const imageInfo = await idbKey.get(id, imageStore)
  if (imageInfo) {
    const url = window.URL.createObjectURL(imageInfo.file)
    return url
  }
  return ''
}

const STORAGEKEY = 'image-watermark-storage-key'

export const defaultWatermarkOptions = {
  id: '',
  size: 100,
  opacity: .3,
  angle: 45,
  x: 0,
  y: 0
}

export const saveOptionsFn = (options)=>{
  localStorage.setItem(STORAGEKEY, JSON.stringify(options))
}

export const getOptionsFn = ()=>{
  const optStr = localStorage.getItem(STORAGEKEY) || ''
  try {
    return JSON.parse(optStr)
  } catch (e){
    return null
  }
}
