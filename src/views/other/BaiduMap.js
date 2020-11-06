import React from 'react';
import NavHeader from '@/components/common/NavHeader';
import { Flex, List,InputItem,Button } from 'antd-mobile';
import { CaretDownOutlined } from '@ant-design/icons';
import { createForm } from 'rc-form';
const { Item } = List;
const Brief = Item.Brief;
class BaiduMap extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      address:[]
    }
  }
  componentDidMount(){
    this.renderMap()
    document.body.querySelector('.qm-fixed-page').style.height = `${window.innerHeight}px`;
  }
  //初始化地图的方法
  renderMap () {
    this.map = new window.BMap.Map("orderDetailMap"); //初始化地图，这个id和下面的id相对应，之所以将初始化的地图放到this对象上，是方便其他方法调用map对象
    // this.map.centerAndZoom('安徽省安庆市迎江区长风乡', 24);
    var point = new window.BMap.Point(116.40387397,39.91488908);
    this.map.centerAndZoom(point, 22);
    var marker = new window.BMap.Marker(point);// 创建标注
    this.map.addOverlay(marker);             // 将标注添加到地图中
    marker.disableDragging();           // 不可拖拽
    // marker.enableDragging(); //marker可拖拽



    let that = this
    var options = {
      onSearchComplete: function (results) {
      // 判断状态是否正确
        if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
        var s = [];
          for (var i = 0; i < results.getCurrentNumPois(); i++){
            s.push({ title: results.getPoi(i).title, text: results.getPoi(i).address } );
          }
          that.setState({
            address:s
          })
        }
      }
    };
    var local = new window.BMap.LocalSearch(this.map, options);
    local.search("海淀上地八街");
    var geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
    if(this.getStatus() === window.BMAP_STATUS_SUCCESS){
      // var mk = new window.BMap.Marker(r.point);
      // this.map.addOverlay(mk);
      // this.map.panTo(r.point);
      // alert('您的位置：'+r.point.lng+','+r.point.lat);
    }
    else {
      alert('failed'+this.getStatus());
    }
  },{enableHighAccuracy: true})
  }
  toPlace(){
//     window.location.href=`baidumap://map/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&src
// =yourCompanyName|yourAppName`
    window.location.href=`http://api.map.baidu.com/marker?location=纬度,经度&title=宋家庄&content=北京车兄弟&output=html`;

  }
  render () {
    const { getFieldProps } = this.props.form;
    return (
      <div className="qm-fixed-page qm-fill-width">
        <NavHeader />
        <Flex style={{height:"100%"}} direction="column">
          <Flex.Item className="qm-fill-width" id="orderDetailMap">
          </Flex.Item >
          <Flex.Item className="qm-fill-width" style={ { "overflow": "auto", "color": "#666666" } } id="searchResultPanel">
            { this.state.address.map((item,index) => {
              return (
              <List key={index}>
                  <Item>
                    {index===0?<span className="iconfont icon-dizhi qm-text-primary">{ item.title }</span>:item.title}
                  <Brief>{ item.text }</Brief>
                </Item>
              </List>
              )
            })}
          </Flex.Item>
          <a href="baidumap://map/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&src
=yourCompanyName|yourAppName">地图标点</a>
            <Button className="qm-fill-width" type="primary" onClick={this.toPlace.bind(this)}>去这里</Button>
        </Flex>
        <div className="qm-fill-bg-white-opacity qm-address-search" >
          <InputItem
            className="qm-body-2"
            {...getFieldProps('focus')}
            clear
            placeholder='请输入收货地址'
            ref={el => this.inputRef = el}
          >
            <Flex direction="row" justify="between" align="center" >
              <span className="iconfont icon-dizhi qm-body-1 qm-text-secondary"></span>
               <Flex.Item><span className="qm-body-2 qm-text-base">北京</span> </Flex.Item>
             <CaretDownOutlined className="qm-body-1 qm-text-secondary" />
            </Flex>
          </InputItem>
        </div>
      </div>
    );
  }
}

export default createForm()(BaiduMap)
