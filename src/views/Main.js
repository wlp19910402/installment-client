import { TabBar } from 'antd-mobile';
import React,{Component}from 'react'
import NavHeader from '@/components/common/NavHeader'
import {mainPageMap,mainTypeMatch}from '@/plugins/libs/mainMap'

class Main extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: 'home'
    };
  }
  componentDidMount(){
    console.log()
    this.setState({
      selectedTab:mainTypeMatch(this.props.match.params.type).type
    })
  }
  render(){
    return (
      <div className="qm-main-page">
        <NavHeader title={mainTypeMatch(this.props.match.params.type).headerName}/>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#77CC99"
          barTintColor="white"
        >
          {mainPageMap.map((item,index)=>{
            return(
              <TabBar.Item
                title={item.title}
                key={index}
                icon={item.icon()}
                selectedIcon={item.icon()}
                selected={this.state.selectedTab === item.type}
                onPress={() => {
                  this.props.history.push(`/main/${item.type}`)
                  this.setState({
                    selectedTab: item.type,
                  });
                }}
              >
                {/* {HomeButton()} */}
              {item.component()}
              </TabBar.Item>
            )
          })}
        </TabBar>
      </div>
    )
  }
};

export default Main;