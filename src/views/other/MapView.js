import React from "react";
import NavHeader from '@/components/common/NavHeader';
import {Flex,Button,WingBlank,WhiteSpace} from  'antd-mobile';

class App extends React.Component {
  constructor(...args){
    super(...args)
    this.state={
      mapCenter:[116.396574, 39.992706]
    }
  }
  async componentDidMount () {
    let that = this
    window.onLoad  = function(){
      window.AMap.plugin(['AMap.Geocoder','AMap.ToolBar','AMap.Scale','AMap.Geolocation'], function() {
        var geocoder = new window.AMap.Geocoder({
         city: '全国'// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        })
        geocoder.getLocation(that.props.match.params.place, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result中对应详细地理坐标信息
             var map = new window.AMap.Map('orderDetailMap',{
                zoom:14,//级别
                center: [result.geocodes[0].location.lng,result.geocodes[0].location.lat],//中心点坐标
                viewMode: '2D',  //设置地图模式
                lang:'zh_cn',  //设置地图语言类型
             });
            //标记
            var marker = new window.AMap.Marker({
                position: [result.geocodes[0].location.lng,result.geocodes[0].location.lat]
            })
            map.add(marker);
            //放大缩小工具
            var toolbar = new window.AMap.ToolBar();
            map.addControl(toolbar);
            //比例尺
            var scale = new window.AMap.Scale();
            map.addControl(scale)
            //定位
            var geolocation = new window.AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: false,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: false,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            window.AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            window.AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            //解析定位结果
            function onComplete(data) {
                if(data.status === 1){
                  alert("定位成功");
                }
                var str = [];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
                str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                alert(str.join('<br>'));
            }
            function onError() {
                var str = [];
                str.push('定位失败');
                alert(str.join('<br>'));
            }
          }else{
            alert("路径不存在")
          }
        })
      })
    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=6858e4db293a29c34f90b3f84e97d5ff&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);

  }
  render() {
    return (
      <div className="qm-fixed-page qm-fill-width">
        <NavHeader />
        <Flex style={{height:"100%"}} direction="column">
          <Flex.Item className="qm-fill-width" id="orderDetailMap"></Flex.Item >
          <Flex>
            <Flex.Item>
              <WhiteSpace size="lg" />
              <WingBlank size="md">
                <div className="qm-fill-width qm-text-secondary qm-body-3">{this.props.match.params.place}</div>
              </WingBlank>
              <WhiteSpace size="lg" />
            </Flex.Item>
            <WingBlank size="md">
              <Button type="primary" onClick={() => { this.changeCenter.bind(this) }}><WingBlank size="lg"><div className="iconfont icon-daohang-xianxing btnIcon"></div></WingBlank></Button>
            </WingBlank>
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default App