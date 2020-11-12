var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;(U;)?CPU.+MacOSX/); //ios终端

export const MOBILE_DEVICE = {
  ANDROID: "android",
  IOS: "ios",
};
export const MAP_APP_STATUS = {
  MINI_MAP: "1",
  BAIDU_MAP: "2",
  QQ_MAP: "3",
};
/**
 * ${targetLat}:目标维度
 * ${targetLon}:目标经度
 * ${targetName}:目标地址名称
 * ${currentLat}:当前维度
 * ${currentLon}:当前经度
 * ${currentName}:当前地址名称
 */
export const mapAppUriArr = [
  {
    status: MAP_APP_STATUS.MINI_MAP,
    name: "高德地图",
    schemeIntent: "com.autonavi.minimap",
    jumpuri:
      "amapuri://route/plan/?sid=&slat=${currentLat}&slon=${currentLon}&sname=${currentName}&did=&dlat=${targetLat}&dlon=${targetLon}&dname=${targetName}&dev=0&t=0",
    device: MOBILE_DEVICE.ANDROID,
  },
  {
    status: MAP_APP_STATUS.MINI_MAP,
    name: "高德地图",
    schemeIntent: "iosamap://",
    jumpuri:
      "iosamap://path?sourceApplication=applicationName&sid=&slat=${currentLat}&slon=${currentLon}&sname=${currentName}&did=&dlat=${targetLat}&dlon=${targetLon}&dname=${targetName}&dev=0&t=0",
    device: MOBILE_DEVICE.IOS,
  },
  {
    status: MAP_APP_STATUS.BAIDU_MAP,
    name: "百度地图",
    schemeIntent: "com.baidu.BaiduMap",
    jumpuri:
      "baidumap://map/direction?origin=name:${currentName}|latlng:${currentLat},${currentLon}&destination=${targetName}",
    device: MOBILE_DEVICE.ANDROID,
  },
  {
    status: MAP_APP_STATUS.BAIDU_MAP,
    name: "百度地图",
    schemeIntent: "baidumap://",
    jumpuri: "baidumap://map/marker?location=${currentLat},${currentLon}&title=${currentName}&content=${targetName}",
    device: MOBILE_DEVICE.IOS,
  },
  {
    status: MAP_APP_STATUS.QQ_MAP,
    name: "腾讯地图",
    schemeIntent: "com.tencent.map",
    jumpuri:
      "qqmap://map/routeplan?type=drive&from=${currentName}&fromcoord=${currentLat},${currentLon}&to=${targetName}&tocoord=${targetLat},${targetLon}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77",
    device: MOBILE_DEVICE.ANDROID,
  },
  {
    status: MAP_APP_STATUS.QQ_MAP,
    name: "腾讯地图",
    schemeIntent: "com.tencent.map",
    jumpuri:
      "qqmap://map/routeplan?type=drive&from=${currentName}&fromcoord=${currentLat},${currentLon}&to=${targetName}&tocoord=${targetLat},${targetLon}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77",
    device: MOBILE_DEVICE.IOS,
  },
];

//调用第三方app
export function tiggerMapApp(appStatus = MAP_APP_STATUS.MINI_MAP, targetPosition, currentPosition) {
  let mactchApp = mapAppUriArr.filter((item) => item.status === appStatus);
  if (mactchApp.length < 1) {
    return;
  }
  let tempApp = {};
  if (isAndroid) {
    tempApp = mactchApp.find((item) => item.device === MOBILE_DEVICE.ANDROID);
  } else {
    tempApp = mactchApp.find((item) => item.device === MOBILE_DEVICE.IOS);
  }
  if (tempApp.jumpuri === undefined) {
    return;
  }
  let jumpuri = tempApp.jumpuri;
  jumpuri = jumpuri.replace("${currentLat}", currentPosition[0] || "");
  jumpuri = jumpuri.replace("${currentLon}", currentPosition[1] || "");
  jumpuri = jumpuri.replace("${currentName}", currentPosition[2] || "");
  jumpuri = jumpuri.replace("${targetLat}", targetPosition[0]);
  jumpuri = jumpuri.replace("${targetLon}", targetPosition[1]);
  jumpuri = jumpuri.replace("${targetName}", targetPosition[2]);
  tempApp.jumpuri = jumpuri;
  jumpMap(tempApp.schemeIntent, tempApp.jumpuri);
}

//URL调起地图APP
export function jumpMap(schemeIntent, jumpuri) {
  window.appAvailability.check(schemeIntent, hasAppPackage, notAppPackage);
  function hasAppPackage() {
    var sApp;
    if (isiOS) {
      //苹果手机
      sApp = window.startApp.set(jumpuri);
    }
    if (isAndroid) {
      //安卓手机
      sApp = window.startApp.set({
        action: "ACTION_VIEW",
        category: "CATEGORY_DEFAULT",
        type: "text/css",
        package: schemeIntent,
        uri: jumpuri,
        flags: ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
        intentstart: "startActivity",
      });
    }
    sApp.start(
      function () {}, //跳转成功
      function (error) {} //失败
    );
  }
  //不存在对应APP
  function notAppPackage() {
    alert("====不存在对应APP");
  }
}
