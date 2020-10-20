import React from 'react';
import { Card, WingBlank, WhiteSpace,List,Grid} from 'antd-mobile';
import {LockOutlined,LogoutOutlined,CustomerServiceOutlined,UserOutlined,MobileOutlined,CreditCardOutlined,BankFilled}from '@ant-design/icons'
import {Link}from 'react-router-dom'
const Item = List.Item;
const data =[
  {
  "icon":()=>(<MobileOutlined/>),
  "text":"15701578892"
},{
  "icon":()=>(<CreditCardOutlined/>),
  "text":"银行卡中心"
},{
  "icon":()=>(<BankFilled/>),
  "text":"中国银行"
}]
class HomePage extends React.Component {
  constructor(...args) {
	  super(...args);
		this.state={
		}
  }
  render() {
    return (
      <div className="qm-fill-width">
      <div className="qm-main-my-header qm-bg-primary">
    <WhiteSpace size="md" />
      <WingBlank size="md">
      <Card>
      <Card.Header
        title={<WingBlank><WhiteSpace size="md" /><div>张先生</div><span className="qm-text-primary qm-body-1">中国银行北京总部</span><WhiteSpace size="md" /></WingBlank>}
        thumb={<div className="qm-icon-cricle"><UserOutlined /></div>}
      />
      <Card.Body>
        <Grid
          hasLine={false}
          activeStyle={false}
          data={data}
          columnNum={2}
          square={false}
          itemStyle={{float:"left",textAlign:"left"}}
          renderItem={dataItem => (
            <div>{dataItem.icon()}<span style={{marginLeft:"4px"}}>{dataItem.text}</span></div>
          )}
        />
      </Card.Body>
    </Card>
    </WingBlank>
      </div>

    <WhiteSpace size="md" />
    <WingBlank size="md">
    <List>
        <Item
          thumb={<LockOutlined className="qm-text-waring mainIcon"/>}
          arrow="horizontal"
          onClick={() => {}}
        >修改密码</Item>
        <Link to="/user/contact">
        <Item
          thumb={<CustomerServiceOutlined  className="qm-text-wait mainIcon"/>}
          arrow="horizontal"
        >
          联系客服
        </Item>
        </Link>
      </List>

    <WhiteSpace size="lg" />
    <List>
    <Link to="/"> <Item
          thumb={<LogoutOutlined  className="qm-text-error mainIcon"/>}
          arrow="horizontal"
          onClick={() => {}}
        > 退出登录</Item></Link>
      </List>
  </WingBlank>
      </div>
    );
  }
}

export default HomePage;