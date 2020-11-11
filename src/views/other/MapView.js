import React from "react";
import NavHeader from '@/components/common/NavHeader';
import { Flex, Button, WingBlank, WhiteSpace ,Modal} from 'antd-mobile';
import { MAP_APP_STATUS, tiggerMapApp, } from '@/plugins/cordovaPlugins/jumpApp'
import {fetchMap} from '@/plugins/resurceStatus/map'
class App extends React.Component {
  constructor(...args){
    super(...args)
    this.state={
      targetPosition: [],
      currentPosition:[]
    }
  }
  async componentDidMount () {
    await fetchMap(this.props.match.params.place,this)
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
              <Button type="primary" onClick=
                {() => Modal.operation([
                { text: "高德地图", onPress: ()=>tiggerMapApp(MAP_APP_STATUS.MINI_MAP,this.state.targetPosition,this.state.currentPosition) },
                { text: '百度地图', onPress: ()=>tiggerMapApp(MAP_APP_STATUS.BAIDU_MAP,this.state.targetPosition,this.state.currentPosition) },
                { text: '腾讯地图', onPress: ()=>tiggerMapApp(MAP_APP_STATUS.QQ_MAP,this.state.targetPosition,this.state.currentPosition) },
              ])}>
                <WingBlank size="lg">
                  <div className="iconfont icon-daohang-xianxing btnIcon"/>
                </WingBlank>
                <WhiteSpace size="lg" />
              </Button>
            </WingBlank>
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default App