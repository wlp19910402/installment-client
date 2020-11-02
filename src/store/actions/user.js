import { getStorage } from "@/plugins/common/storage";
import { CLIENT_INTERFACE } from "@/plugins/libs/interfaceMap";
import axios from "@/plugins/requestServer/httpClient";
import { SET_USER_INFO } from "@/store/actions";
import { Base64 } from "js-base64";
import store from "@/store";
import { Toast } from "antd-mobile";
// 检测token值的有效，如果在loginFlag=true登录状态的话，则没隔30秒进行检查token有效时间比当前时间是不是小于3分钟，如果小于三分钟则请求刷新token
export const watchToken = () => async (dispatch, getState) => {
    if (getState().user.accountId.trim()!=='') {
      const { token } = getStorage("storageUserInfo");
      if (token !== "") {
        const jwtTokenArr = token.split(".");
        const tokenExpiration = JSON.parse(Base64.decode(jwtTokenArr[1])).exp; // 截取token中的preload中的exp的有效期时间。
        const minTime = Math.floor(Math.floor(Date.now()/ 1000) + 3 * 60); // 获取当前时间并加上最小的有效期时间 3分钟就要到最大有效期了哦？
        if (tokenExpiration > minTime) {
          // 如果大于，则监听30秒之后再检测一次
          watchRefreshTime()
          return;
        }
        // 去请求刷新token
        const res = await axios.get(CLIENT_INTERFACE.REFRESH_TOKEN); // 刷新token值
        console.log("刷新了token", res);
        if (res.data.err === "0") {
          dispatch({ type: SET_USER_INFO, data:{token: res.data.result.token} })
        }
      }
    }
}
//则监听31秒之后再检测一次
export const watchRefreshTime = async () => setTimeout(async () => { await store.dispatch(watchToken()) }, 1000 * 31);

// 是否已经登录过及查证token是否是有效登录，并更新token
export const fetchCheckLogin = async () => async (dispatch, getState) => {
    const { hash } = window.location;
    const path = hash.substring(1, hash.length);
    // 用户是否已经登录过了
  if (getState().user.accountId.trim() !== '') {
      if (path === "/login") {
        window.location.hash = "#/main/home";
      }
      return;
    }
    // 本地是否有存储用户信息
  const storageUserInfo = getStorage("storageUserInfo");
    // 根据本地存储的用户信息，进行请求token是否有效登录，如果有效则更新token值
    try {
      const res = await axios.get(CLIENT_INTERFACE.CHECK_IS_LOGIN);
      if (res.data.err !== "0") {
        if (path === "/login") {
          return;
        }
        Toast.info(res.data.msg, 1);
        return;
      }
      const userData = { ...storageUserInfo, ...res.data.result };
      dispatch({ type: SET_USER_INFO, data:userData })
      if (path === "/login") {
        window.location.hash = "#/main/home";
      }
      console.log("已经登录了");
    } catch (err) {
      console.log(err);
    }
}
