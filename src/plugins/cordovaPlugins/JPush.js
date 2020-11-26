
document.addEventListener(
  "jpush.openNotification",
  function () {
    //打开通知
    try {
      //获取极光推送附带的参数
      var id = event.extras.id;
      var lx = event.extras.lx;
      //相应的动作
    } catch (exception) {
      console.log("JPushPlugin:onOpenNotification" + exception);
    }
  },
  false
);
document.addEventListener(
  "jpush.receiveNotification",
  function () {
    //收到通知
    try {
      //获取极光推送附带的参数
      var id = event.extras.id;
      var lx = event.extras.lx;
      //相应的动作
    } catch (exception) {
      console.log("JPushPlugin:onReceiveNotification" + exception);
    }
  },
  false
);
