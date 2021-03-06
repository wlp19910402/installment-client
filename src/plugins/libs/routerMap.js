import Test from "@/components/test";
import Login from "@/views/Login";
import Main from "@/views/Main";
import Contact from "@/views/user/Contact";
import UpdatePassword from "@/views/user/UpdatePassword";
import ReleaseTask from "@/views/bankStaff/release";
import MapView from "@/views/other/MapView";
import PerformNameList from "@/views/bankStaff/PerformNameList";
import Msg from "@/views/bankStaff/Msg";
// import {USER_IDNTITY}from  '@/plugins/resurceStatus/user';
/**
 * 路由表
 * @param {*} path:地址
 * @param {*} name:名称
 * @param {*} component:组件
 * @param {*} loginFlag:是否需要登录,登录标识
 * @param {*} exact:子集路由下包含此等组件
 * @param {*} hasBack:是否又返回键
 * @param {*} identity:身份 --待定哦
 */
class Res {
  constructor(path, name, component, loginFlag = true, exact = true, hasBack = true) {
    this.path = path;
    this.name = name;
    this.component = component;
    this.loginFlag = loginFlag;
    this.exact = exact;
    this.hasBack = hasBack;
  }
  //根据路径进行匹配当前的路由的基本信息
  match(path) {
    const pathArr = path.split("/");
    const regexp = /^:\w+/i;
    const itemArr = this.path.split("/");
    itemArr.forEach((str, index) => {
      if (regexp.test(str)) {
        itemArr[index] = pathArr[index];
      }
    });
    return JSON.stringify(itemArr) === JSON.stringify(pathArr);
  }
}
const commonRouter = [
  new Res("/", "测试", Test, true, true, false),
  new Res("/login", "登录", Login, false, true, false),
  new Res("/mapView/:place", "位置信息", MapView, false),
  new Res("/msg/:msgid", "消息列表", Msg, false),
];

//经办人员的routerMap
const bankRouterMap = [
  ...commonRouter,
  new Res("/main/:type", "主要的", Main, true, false, false),
  new Res("/user/contact", "联系客服", Contact),
  new Res("/user/updatePassword", "修改密码", UpdatePassword),
  new Res("/bankStaff/release", "发布任务", ReleaseTask),
  new Res("/bankStaff/selectPerformName", "外勤名单", PerformNameList),
];

//外勤人员的routerMap
const performRouterMap = [
  ...commonRouter,
  new Res("/perform/main/:type", "主要的", Main, true, false, false),
  new Res("/perform/user/contact", "联系客服", Contact),
  new Res("/perform/user/updatePassword", "修改密码", UpdatePassword),
];
export default bankRouterMap;
export { bankRouterMap, performRouterMap };
