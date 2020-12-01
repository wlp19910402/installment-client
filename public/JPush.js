/**
 * 极光推送收到通知和打开通知的相应动作
 */
document.addEventListener(
  "jpush.openNotification",
  function (event) {
    //打开通知
    try {
      //获取极光推送附带的参数
      var id = event.extras.id;
      var lx = event.extras.lx;
      alert(JSON.stringify(event.extras));
      //相应的动作
    } catch (exception) {
      alert("JPushPlugin:onOpenNotification" + exception);
    }
  },
  false
);
document.addEventListener(
  "jpush.receiveNotification",
  function (event) {
    //收到通知
    try {
      //获取极光推送附带的参数
      var id = event.extras.id;
      var lx = event.extras.lx;
      alert(JSON.stringify(event.extras));
      //相应的动作
    } catch (exception) {
      alert("JPushPlugin:onReceiveNotification" + exception);
    }
  },
  false
);
