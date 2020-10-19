
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
function userInfo (state={accountId:'',accountType:USER_IDNTITY.BANK_STAFF,token:null,isAuth:false,redirectPath:'/'},action){
	switch(action.type){
		case SET_USER_INFO:
			let newState={
				...state,
        accountId:action.data.accountId,
        accountType:action.data.accountType,
        token:action.data.token,
        isAuth:action.data.accountId.trim()!==''
      }
      setStorage('storageUserInfo',{...action.data})
			return newState;
		case CLEAR_USER_INFO:
			let clearState={
				...state,
				accountId:'',
        token:'',
        isAuth:false
      }
      removeStorage('storageUserInfo')
      return clearState;
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