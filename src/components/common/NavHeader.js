import { NavBar, Icon } from 'antd-mobile';
import React,{Component}from 'react'
// import {connect} from 'react-redux'
// import {pathMatch} from '@/plugins/libs/routerMap'
class NavHeaderCmp extends Component{
  // constructor(...args) {
  //   super(...args);
  // }
  render(){
    return (
      <NavBar
        mode="dark"
        // leftContent={[
        //   <Icon key="0" type="left" />,
        // ]}
        // rightContent={[
        //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        //   <Icon key="1" type="ellipsis" />,
        // ]}
      >{this.props.match||'装修分期'}</NavBar>
    )
  }
};

export default NavHeaderCmp