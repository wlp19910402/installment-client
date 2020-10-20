import { WhiteSpace } from 'antd-mobile';
import React,{Component}from 'react'
import NavHeader from '@/components/common/NavHeader'
import {mainTypeMatch}from '@/plugins/libs/mainMap'
import {PhoneOutlined}from '@ant-design/icons'

import {routerMatch}from '@/plugins/libs/routerMap'
class Main extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: 'home'
    };
  }
  componentDidMount(){
    console.log(this.props.match)
    this.setState({
      selectedTab:mainTypeMatch(this.props.match.params.type).type
    })
  }
  render(){
    return (
      <div className="qm-main-page">
        <NavHeader/>
        <div className="qm-main-content">
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <img src={require('@/assets/img/contact.png')}/>
          <WhiteSpace size="lg" />
          <PhoneOutlined/>010_8787989
        </div>
      </div>
    )
  }
};

export default Main;