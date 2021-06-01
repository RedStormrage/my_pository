export function localGet(key){
  const value = window.localStorage.getItem(key)
  try{
    return JSON.parse(window.localStorage.getItem(key))
  }catch(e){
    return e
  }
}

export function localSet(key, value){
  const value = window.localStorage.setItem(key,value)
}

export function localRemove(key,value){
  window.localStorage.remove(key)
}