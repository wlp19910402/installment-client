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
            convert: false, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false, //显示定位按钮，默认：true
            buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
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
              // modelStatus.currentPosition = [data.position.getLng(), data.position.getLat(), "我的位置"];
              // alert("定位：" + data.position.getLng() + " , " + data.position.getLat());
              // that.setState(modelStatus);

              var gpsPoint = GPS.gcj_encrypt(data.position.getLat(), data.position.getLng());
              modelStatus.currentPosition = [gpsPoint.lon, gpsPoint.lat, "我的位置"];
              alert(gpsPoint.lon + "," + gpsPoint.lat);
              that.setState(modelStatus);
              if (data.accuracy) {
                alert("精度：" + data.accuracy + " 米");
              } //如为IP精确定位结果则没有精度信息
              alert("是否经过偏移：" + (data.isConverted ? "是" : "否"));
              //  if (data.accuracy) {
              //    str.push("精度：" + data.accuracy + " 米");
              //  } //如为IP精确定位结果则没有精度信息
              //  str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
              // _this.centerPointer = gpsPoint;
              // _this.circleArea(gpsPoint);
              // _this.getAddress(gpsPoint);
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

var GPS = {
  PI: 3.14159265358979324,
  x_pi: (3.14159265358979324 * 3000.0) / 180.0,
  delta: function (lat, lon) {
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = (lat / 180.0) * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI);
    return {
      lat: dLat,
      lon: dLon,
    };
  },
  //WGS-84 to GCJ-02
  gcj_encrypt: function (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon))
      return {
        lat: wgsLat,
        lon: wgsLon,
      };

    var d = this.delta(wgsLat, wgsLon);
    return {
      lat: wgsLat + d.lat,
      lon: wgsLon + d.lon,
    };
  },
  outOfChina: function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
  },
  transformLat: function (x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((y / 12.0) * this.PI) + 320 * Math.sin((y * this.PI) / 30.0)) * 2.0) / 3.0;
    return ret;
  },
  transformLon: function (x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((x / 12.0) * this.PI) + 300.0 * Math.sin((x / 30.0) * this.PI)) * 2.0) / 3.0;
    return ret;
  },
};
