/**
 * 修改密码
 */
import { WhiteSpace } from 'antd-mobile';
import React,{Component}from 'react'
import NavHeader from '@/components/common/NavHeader'
import {mainTypeMatch}from '@/plugins/libs/mainMap'
import {PhoneFilled}from '@ant-design/icons'

class Main extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: 'home'
    };
  }
  componentDidMount(){
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
          <span className="qm-text-wait"><PhoneFilled rotate="90"/>  010_8787989</span>
        </div>
      </div>
    )
  }
};

export default Main;