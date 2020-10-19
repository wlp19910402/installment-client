import Test from '@/components/test'
import Login from '@/views/Login'
import Main from '@/views/Main'

/**
 * 路由表
 * @param {*} path:地址
 * @param {*} name:名称
 * @param {*} component:组件
 * @param {*} isAuth:是否需要登录权限
 */
 const routerMap= [
  {path:'/',name:'测试',component:Test,isAuth:true},
  {path:'/login',name:'登录',component:Login,isAuth:false},
  {path:'/main',name:'首页',component:Main,isAuth:true}
]

export const pathMatch = (path) => {
  let pathArr = path.split('/')
  let regexp = /^\{\w+\}$/i
  let matchRes = routerMap.find((res) => {
    let itemArr = res.path.split('/')
    itemArr.forEach((str, index) => {
      if (regexp.test(str)) {
        itemArr[index] = pathArr[index]
      }
    })
    if (JSON.stringify(itemArr) === JSON.stringify(pathArr)) {
      return res
    }
  })
  if (matchRes) {
    return matchRes
  }
  return null
}
export default routerMap