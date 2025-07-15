
const STORAGEKEY = 'letter-watermark-storage-key'

export const defaultWatermarkOptions = {
  letter: 'Just One Page PDF',
  fontFamily: 'serif',
  fontSize: 14,
  letterSpacing: 0,
  opacity: .3,
  color: 'black',
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
