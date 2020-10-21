
import {USER_IDNTITY} from '@/plugins/resurceStatus/user'
import {SET_USER_INFO,CLEAR_USER_INFO,SET_REDIRECT}from '@/store/actions'
import {removeStorage,setStorage}from '@/plugins/common/storage'
/**
 *
 * @param {*} accountId:账号ID
 * @param {*} accountType:账号类型，分为经办人员和外勤人员
 * @param {*} token:登录之后的token值
 * @param {*} isAuth:是否已经登录
 * @param {*} redirectPath:重定向地址
 */
const userDefault= {
  accountId:'188888888',
  accountType:USER_IDNTITY.BANK_STAFF,
  token:null,
  isAuth:false,
  redirectPath:'/',
  user_name:"尚未登录",
  department:"测试部门",
  company_unit:"测试单位",
  user_position:"测试公司"
}
function userInfo (state=userDefault,action){
  console.log(action.data)
	switch(action.type){
		case SET_USER_INFO:
			let newState={
				...state,
        ...action.data,
        isAuth:action.data.accountId.trim()!=='',
      }
      let logState={
        accountId:newState.accountId,
        accountType:newState.accountType,
        token:newState.token
      }
      setStorage('storageUserInfo',logState)
			return newState;
		case CLEAR_USER_INFO:
      removeStorage('storageUserInfo')
      return userDefault;
    case SET_REDIRECT:
      let setRedirectState={
        ...state,
        redirectPath:action.data
      }
      return setRedirectState;
		default:
			return state;
	}
}

export default userInfo