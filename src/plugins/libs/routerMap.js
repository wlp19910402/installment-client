import Test from '@/components/test'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Contact from '@/views/user/Contact'
/**
 * 路由表
 * @param {*} path:地址
 * @param {*} name:名称
 * @param {*} component:组件
 * @param {*} isAuth:是否需要登录权限
 */
 const routerMap= [
  {path:'/',name:'测试',component:Test,isAuth:true,exact:true},
  {path:'/login',name:'登录',component:Login,isAuth:false,exact:true},
  {path:'/main/:type',name:'主要的',component:Main,isAuth:true,exact:false},
  {path:'/user/contact' ,name:'联系客服',component:Contact,isAuth:true,exact:true}
]

export const routerMatch=(path)=>{
  let pathArr = path.split('/')
  let regexp = /^\:w+\$/i
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
}
export default routerMap