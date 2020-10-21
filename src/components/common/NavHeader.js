import { NavBar,Icon } from 'antd-mobile';
import React,{Component}from 'react'

import {routerMatch}from '@/plugins/libs/routerMap'

class NavHeaderCmp extends Component{
  constructor(...args) {
    super(...args);
    this.state={
      title:'装修分期',
      back:true
    }
}
  componentDidMount(){
    let hash =window.location.hash
    let path = hash.substring(1,hash.length)
    let pathList = routerMatch(path)
    if(pathList){
      this.setState({
        title:pathList.name ||'装修分期',
        back:pathList.back
      })
    }
  }
  goBack(){
    window.history.back()
  }
  render(){
    return (
      <NavBar
      icon={this.state.back?<Icon type="left" onClick={this.goBack}/>:null}
        mode="dark"
      >{this.props.title||this.state.title}</NavBar>
    )
  }
};

export default NavHeaderCmp

