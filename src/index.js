import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "@/assets/less/qm-style.less";
import { Provider } from "react-redux";
import store from "@/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */

var app = {
  initialize: function () {
    alert("===[注册初始化事件]===");
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function () {
    //设备准备完毕
    alert("===[设备准备就绪]===");
    initJPush(); //初始化极光推送
  },
};
app.initialize();

function initJPush() {
  alert("===[初始化极光推送]===");
  try {
    window.JPush.init();
    window.JPush.setDebugMode(true);
    if (window.device.platform !== "Android") {
      window.JPush.setApplicationIconBadgeNumber(0);
    }
  } catch (exception) {
    alert(exception);
  }
  document.addEventListener(
    "jpush.receiveRegistrationId",
    function (event) {
      alert("receiveRegistrationId" + JSON.stringify(event));
    },
    false
  );
}
// function setAlias(alias) {
//   alert("======[alias]====:" + alias);
//   window.JPush.setAlias(
//     { sequence: 1, alias: alias },
//     function (result) {
//       alert("alias设置成功：" + result.alias);
//     },
//     function (error) {
//       alert("err:" + error.code);
//     }
//   );
// }
serviceWorker.unregister();
