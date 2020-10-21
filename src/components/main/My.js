import React from 'react';
import { Modal,Card, WingBlank, WhiteSpace,List,Grid} from 'antd-mobile';
import {LockOutlined,LogoutOutlined,CustomerServiceOutlined,UserOutlined,MobileOutlined,CreditCardOutlined,BankFilled}from '@ant-design/icons'
import {Link}from 'react-router-dom'
import {connect} from 'react-redux'
import {CLEAR_USER_INFO}from '@/store/actions'

const Item = List.Item;
const alert=Modal.alert;
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

const showAlert = () => {

};

class HomePage extends React.Component {
  fetchUserTag(){
    data.forEach((item,index)=>{
      if(index===0){
        item.text=this.props.user.accountId
      }else if(index===1){
        item.text=this.props.user.department
      }else if(index===2){
        item.text=this.props.user.company_unit
      }
    })
    return data
  }
  exitClearUserData(){
    const alertInstance = alert('确认要退出登录吗','', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认退出', onPress: () =>{
        this.props.parent.props.history.push('/login')
        this.props.clearUserInfo()
      }},
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      alertInstance.close();
    }, 500000);


  }
  render() {
    return (
      <div className="qm-fill-width">
      <div className="qm-main-my-header qm-bg-primary">
    <WhiteSpace size="md" />
      <WingBlank size="md">
      <Card>
      <Card.Header
        title={<WingBlank>
          <WhiteSpace size="md" />
          <div>{this.props.user.user_name}</div>
          <span className="qm-text-primary qm-body-1">{this.props.user.user_position}</span>
          <WhiteSpace size="md" /></WingBlank>}
        thumb={<div className="qm-icon-cricle"><UserOutlined /></div>}
      />
      <Card.Body>
        <Grid
          hasLine={false}
          activeStyle={false}
          data={this.fetchUserTag()}
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
    <Link to="/">
        <Item
          thumb={<LockOutlined className="qm-text-waring mainIcon"/>}
          arrow="horizontal"
          onClick={() => {}}
        >修改密码</Item></Link>
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
     <Item
          thumb={<LogoutOutlined  className="qm-text-error mainIcon"/>}
          arrow="horizontal"
          onClick={this.exitClearUserData.bind(this)}
        > 退出登录</Item>
      </List>
  </WingBlank>
      </div>
    );
  }
}
export default connect((state,props)=>{
	return ({
    ...props,
    ...state
  })
},{
  clearUserInfo(){
		return{
			type:CLEAR_USER_INFO
		}
  }
})(HomePage)