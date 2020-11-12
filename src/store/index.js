import { createStore, combineReducers, applyMiddleware } from "redux";
import { watchRefreshTime } from "@/store/actions/user";
import thunk from "redux-thunk";
import user from "@/store/reducer/user";
const arr = combineReducers({
  user,
});
export let store = createStore(arr, applyMiddleware(thunk));

//监听state的变化
let curl = store.getState();
store.subscribe(async () => {
  let pre = curl;
  curl = store.getState();
  console.log("store变化了");
  if (pre.user.token !== curl.user.token) {
    console.log("token不相等，要调用哦");
    if (curl.user.token) {
      await watchRefreshTime();
    }
  }
});

export default store;
