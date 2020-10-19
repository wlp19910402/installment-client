import { NavBar, Icon } from 'antd-mobile';
import React,{Component}from 'react'
class Cmp1 extends Component{
  render(){
    return (
      <NavBar
        mode="dark"
        leftContent="Back"
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >NavBar</NavBar>

    )
  }
};

export default Cmp1;