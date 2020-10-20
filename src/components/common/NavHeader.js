import { NavBar,Icon } from 'antd-mobile';
import React,{Component}from 'react'
import {connect} from 'react-redux'

import {routerMatch}from '@/plugins/libs/routerMap'

class NavHeaderCmp extends Component{
  componentDidMount(){
    console.log("update")
    this.state={
      title:'装修分期'
    }
    // console.log(this.props.match)
  }
  componentDidUpdate(){
    let hash =window.location.hash
    let path = hash.substring(1,hash.length)
    this.setState=({
      title:routerMatch(path)||'装修分期'
    })
  }
  goBack(){
    window.history.back()
  }
  render(){
    return (
      <NavBar
      icon={<Icon type="left" onClick={this.goBack}/>}
        mode="dark"
      >{this.props.title||this.state.title}</NavBar>
    )
  }
};


export default connect((state,props)=>{
  console.log(props)
  let hash =window.location.hash
  let path = hash.substring(1,hash.length)
  let newProps={
    ...props
  }
  if(props){
    if(props.title){
    newProps={
      ...props,
      title:props.title||'装修分期'
    }
    return newProps
  }
  }
return {title:"装修分期"}

})(NavHeaderCmp)

