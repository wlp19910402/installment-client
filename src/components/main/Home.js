import React from 'react';
import { Card, WingBlank, WhiteSpace,List,Badge} from 'antd-mobile';
// import {Link}from'react-router-dom'
import banner from '@/assets/img/home-banner.png'
import {infoListMatch} from '@/plugins/resurceStatus/infoList'
const Item = List.Item;
const Brief = Item.Brief;

class HomePage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state={
      ...infoListMatch('0'),
      subTextWith: window.innerWidth-100+"px"
    }
  }
  render() {
    return (
      <div className="qm-fill-width qm-main-home">
    <WingBlank size="md">
    <WhiteSpace size="md" />
    <Card><img src={banner}></img></Card>
    <WhiteSpace size="md" />
    <List>
        <Item
          arrow="horizontal"
          thumb={this.state.icon()}
          multipleLine
          onClick={() => {}}
        >
          {this.state.title} <Brief>{this.state.text}</Brief>
        </Item>
      </List>
      <WhiteSpace size="md" />
      {['1','2','3','4','5'].map(item=>{
        return(
          <div key={item}>
          <List>
            <Item
              style={{overflow:"auto"}}
              thumb={infoListMatch(item).icon()}
              multipleLine
              onClick={() => {}}
            >
              {infoListMatch(item).title}
              <Badge style={{marginTop:"-16px",zIndex:10,position:"absolute"}} text={7+parseInt(item)} overflowCount={10} />
              <div style={{float:"right",color:"#999"}} className="qm-body-1">{"2020/10/20 10:30"}</div>
              <Brief style={{width:this.state.subTextWith}}>李宇轩完成了任务，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，资料已上传完成，请...</Brief>
            </Item>
          </List>
          <WhiteSpace size="md" />
          </div>
        )
      })}
  </WingBlank>
      </div>
    );
  }
}

export default HomePage;