import Test from '@/components/test';
import Login from '@/views/Login';
import Main from '@/views/Main';
import Contact from '@/views/user/Contact';
import UpdatePassword from '@/views/user/UpdatePassword';
/**
 * 路由表
 * @param {*} path:地址
 * @param {*} name:名称
 * @param {*} component:组件
 * @param {*} loginFlag:是否需要登录,登录标识
 * @param {*} exact:子集路由下包含此等组件
 * @param {*} back:是否又返回键
 */
const routerMap = [
  {
    path: '/', name: '测试', component: Test, loginFlag: true, exact: true, back: false,
  },
  {
    path: '/login', name: '登录', component: Login, loginFlag: false, exact: true, back: false,
  },
  {
    path: '/main/:type', name: '主要的', component: Main, loginFlag: true, exact: false, back: false,
  },
  {
    path: '/user/contact', name: '联系客服', component: Contact, loginFlag: true, exact: true, back: true,
  },
  {
    path: '/user/updatePassword', name: '修改密码', component: UpdatePassword, loginFlag: true, exact: true, back: true,
  },
];

export const routerMatch = (path) => {
  const pathArr = path.split('/');
  const regexp = /^:\w+/i;
  const matchRes = routerMap.find((res) => {
    const itemArr = res.path.split('/');
    itemArr.forEach((str, index) => {
      if (regexp.test(str)) {
        itemArr[index] = pathArr[index];
      }
    });
    if (JSON.stringify(itemArr) === JSON.stringify(pathArr)) {
      return res;
    }
    return false;
  });
  if (matchRes) {
    return matchRes;
  }
  return null;
};
export default routerMap;
