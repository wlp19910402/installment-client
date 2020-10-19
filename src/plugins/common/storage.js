/**
 * 将数据提交localStore本地数据
 * @param {提交本地数据的名字} name
 * @param {提交本地数据的数据} data
 */
export const setStorage = (name, data) => {
  localStorage[name] = JSON.stringify(data)
}
/**
 * 获取localStore本地数据
 * @param {获取本地数据的名字} name
 */
export const getStorage = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
/**
 * 移除localStore本地数据
 * @param {移除的本地数据的名字} name
 */
export const removeStorage = (name) => {
  localStorage.removeItem(name)
}
/**
 * 发生修改时提交下更新时间。
 */
export const setLocalUpdateTime = () => {
  const tmpTimeStamp = Date.parse(new Date())
  localStorage['updateTime'] = tmpTimeStamp
}
/**
 * 登录成功或者刷新token获取到token的浏览器时间
 */
export const setTokenAuthTime = async () => {
  const tmpTimeStamp = Date.parse(new Date())
  localStorage['tokenTime'] = tmpTimeStamp
}
/**
 * 将map数据存储在本地，需要先转成数组格式。
 * @param {存储在local本地的名字} name
 * @param {Map对象结构数据} mapObj
 * @param {几层Map对象} level
 */
export const mapObjectConvertToArray = (name, mapObj, level = 1) => {
  let tmpLocal = [...mapObj]
  if (level === 2) {
    //层级为2的Map对象
    tmpLocal.forEach((item) => {
      item[1] = [...item[1]]
    })
  }
  setStorage(name, tmpLocal)
}
/**
 * 获取本地的数据，并将数据由数组格式转换成map对象格式的数据。
 * @param {存储在local本地的名字} name
 * @param {存储在本地的数组} arr
 * @param {需要转成几层Map对象结构的} level
 */
export const localArrayConvertToMapObjectInit = (name, level = 1) => {
  if (getStorage(name) !== undefined && getStorage(name) !== null) {
    let tmp = getStorage(name)
    if (level === 2) {
      //层级为2的Map对象
      tmp.forEach((item) => {
        item[1] = new Map(item[1])
      })
    }
    return new Map(tmp)
  } else {
    return new Map()
  }
}