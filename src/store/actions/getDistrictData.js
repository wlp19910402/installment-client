const axios = require('axios')
const AMAP_Key = "b1b79dacf4aa6fd369f1265848f3c384"

// 根据地址名称获取经纬度
export async function getGeocode (address) {
  try {
    let res = await  axios.get('https://restapi.amap.com/v3/geocode/geo', {
    params: {
      address,
      output:JSON,
      key:AMAP_Key
      }
    })
    if (res.data.status === '1') {
      let geocodes = res.data.geocodes[0].location
      console.log(geocodes)
      return geocodes
    }
    return ''
  } catch(err) {
    console.log(err)
    return ''
  }
}
// 请求区域
export async function getDistrictData () {
  try {
    let res = await  axios.get('https://restapi.amap.com/v3/config/district', {
    params: {
      keywords: "中国",
      subdistrict: "3",
      key:AMAP_Key
      }
    })
    if (res.data.status === '1') {
      let resArr = formatDistrict(res.data.districts[ 0 ].districts)
      console.log(resArr)
      return resArr
    }
    return []
  } catch(err) {
    console.log(err)
    return []
  }
}
/*
* @description    根据高德地图行政数据进行对应转换成需要的数据结构
* @param   arr  要排序的json数组对象
* @return  array  返回排序后的json数组
*/
function formatDistrict(arr){
  let newArr = arr.map((item) => {
    return {
      value:item.adcode,
      label: item.name,
      children: item.districts.length > 0 ? formatDistrict(item.districts) :[]
    }
  })
   //根据value进行排序下
  newArr =  jsonSort(newArr, 'value', false)
  return newArr
}

/*
* @description    根据某个字段实现对json数组的排序
* @param   array  要排序的json数组对象
* @param   field  排序字段（此参数必须为字符串）
* @param   reverse 是否倒序（默认为false）
* @return  array  返回排序后的json数组
*/
function jsonSort(array, field, reverse) {
  //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
  if (array.length < 2 || !field || typeof  array[0] !== "object" )  return array;
  //数字类型排序
  if ( typeof array[0][field] ===  "number" ) {
    array.sort( function (x, y) { return  x[field] - y[field]});
  }
  //字符串类型排序
  if ( typeof array[0][field] ===  "string" ) {
    array.sort( function (x, y) { return  x[field].localeCompare(y[field])});
  }
  //倒序
  if (reverse) {
    array.reverse();
  }
  return array;
}