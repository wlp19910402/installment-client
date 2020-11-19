export async function fetchMap(place, that) {
  let modelStatus = {
    targetPosition: [],
    currentPosition: [],
  };
  window.onLoad = function () {
    window.AMap.plugin(["AMap.Geocoder", "AMap.ToolBar", "AMap.Scale", "AMap.Geolocation"], function () {
      var geocoder = new window.AMap.Geocoder({
        city: "全国", // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      });
      geocoder.getLocation(place, function (status, result) {
        if (status === "complete" && result.info === "OK") {
          modelStatus.targetPosition = [result.geocodes[0].location.lat, result.geocodes[0].location.lng, place];
          that.setState(modelStatus);
          // result中对应详细地理坐标信息
          var map = new window.AMap.Map("orderDetailMap", {
            zoom: 14, //级别
            center: [modelStatus.targetPosition[1], modelStatus.targetPosition[0]], //中心点坐标
            viewMode: "2D", //设置地图模式
            lang: "zh_cn", //设置地图语言类型
          });
          //标记
          var marker = new window.AMap.Marker({
            position: [result.geocodes[0].location.lng, result.geocodes[0].location.lat],
          });
          map.add(marker);
          //放大缩小工具
          var toolbar = new window.AMap.ToolBar();
          map.addControl(toolbar);
          //比例尺
          var scale = new window.AMap.Scale();
          map.addControl(scale);
          //定位
          var geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false, //显示定位按钮，默认：true
            buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(4, 8), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          window.AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
          window.AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
          //解析定位结果
          function onComplete(data) {
            if (data.status === 1) {
              modelStatus.currentPosition = [data.position.getLng(), data.position.getLat(), "我的位置"];
              that.setState(modelStatus);
            }
          }
          function onError() {
            alert("定位失败");
          }
        } else {
          alert("路径不存在");
        }
      });
    });
  };
  var url = "https://webapi.amap.com/maps?v=1.4.15&key=6858e4db293a29c34f90b3f84e97d5ff&callback=onLoad";
  var jsapi = document.createElement("script");
  jsapi.charset = "utf-8";
  jsapi.src = url;
  document.head.appendChild(jsapi);
}
