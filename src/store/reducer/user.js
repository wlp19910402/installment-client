import { USER_IDNTITY } from '@/plugins/resurceStatus/user';
import {
  SET_USER_INFO, CLEAR_USER_INFO, SET_REDIRECT, SET_ACCEPT_ORDER_STATUS,
} from '@/store/actions';
import { removeStorage, setStorage } from '@/plugins/common/storage';
/**
 *
 * @param {*} accountId:账号ID
 * @param {*} accountType:账号类型，分为经办人员和外勤人员
 * @param {*} token:登录之后的token值
 * @param {*} redirectPath:重定向地址
 * @param {*} userName:登录者的名字
 * @param {*} department:登录者的部门
 * @param {*} companyUnit:登录者的公司名称
 * @param {*} position:登录者的职位
 * @param {*} acceptOrderStatus:是否接单，在外勤人员需要，默认是 0 是不接单，1 是接单，
 */
const userDefault = {
  accountId: '',
  accountType: USER_IDNTITY.BANK_STAFF,
  token: "",
  redirectPath: '/main/home',
  userName: '尚未登录',
  department: '测试部门',
  companyUnit: '默认单位',
  position: '默认职位',
  acceptOrderStatus: 0,
};

function userInfo(state = userDefault, action) {
  switch (action.type) {
    case SET_USER_INFO: {
      const newState = {
        ...state,
        ...action.data
      };
      const logState = {
        accountId: newState.accountId,
        accountType: newState.accountType,
        token: newState.token,
      };
      setStorage('storageUserInfo', logState);
      return newState;
    }
    case CLEAR_USER_INFO:{
      removeStorage('storageUserInfo');
      return userDefault;
    }
    case SET_REDIRECT:{
      return Object.assign({},state,{redirectPath: action.data});
    }
    case SET_ACCEPT_ORDER_STATUS: {
      return Object.assign({},state,{acceptOrderStatus: action.data});
    }
    default:
      return state;
  }
}

export default userInfo;
