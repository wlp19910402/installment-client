import React from 'react';
import { Modal,Card, WingBlank, WhiteSpace,List,Grid,Switch,Toast} from 'antd-mobile';
import {LockOutlined,LogoutOutlined,CustomerServiceOutlined,UserOutlined,MobileOutlined,CreditCardOutlined,BankFilled,CarryOutFilled}from '@ant-design/icons'
import {Link}from 'react-router-dom'
import {connect} from 'react-redux'
import {CLEAR_USER_INFO,SET_ACCEPT_ORDER_STATUS}from '@/store/actions'
import { createForm } from 'rc-form';
import {USER_IDNTITY} from '@/plugins/resurceStatus/user'
import {CLIENT_INTERFACE}from '@/plugins/libs/interfaceMap'
import axios from '@/plugins/requestServer/httpClient'

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
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  fetchUserTag(){
    data.forEach((item,index)=>{
      if(index===0){
        item.text=this.props.user.accountId
      }else if(index===1){
        item.text=this.props.user.department
      }else if(index===2){
        item.text=this.props.user.companyUnit
      }
    })
    return data
  }
  exitClearUserData(){
    const alertInstance = alert('确认要退出登录吗','', [
      { text: '取消', onPress: () => null, style: 'default' },
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
    const { getFieldProps } = this.props.form;
    return (
      <div className="qm-fill-width">
      <div className="qm-main-my-header qm-bg-primary">
    <WhiteSpace size="md" />
      <WingBlank size="md">
      <Card>
      <Card.Header
        title={<WingBlank>
          <WhiteSpace size="md" />
          <div>{this.props.user.userName}</div>
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
    {this.props.user.accountType===USER_IDNTITY.FOREIGN_STAFF?
    <div>
      <List>
      <Item
        thumb={<CarryOutFilled className="qm-text-primary mainIcon"/>}
          extra={<Switch
            {...getFieldProps('acceptOrderStatus', {
              initialValue: this.props.user.acceptOrderStatus!==0,
              valuePropName: 'checked',
              onChange: (val) => {
                console.log(val);
              },
            })}
            onClick={async(checked) => {
              try{
                let res = await axios.post(CLIENT_INTERFACE.SET_ACCEPT_ORDER_STATUS,{"acceptOrderStatus":checked?1:0})
                if(res.data.err!=='0'){
                  Toast.info(res.data.msg, 1);
                  return
                }
                let userData = res.data.result
                this.props.form.setFieldsValue({
                  acceptOrderStatus:userData===0?false:true
                });
                this.props.setWhetherOrder(userData)
              }catch(err){
                console.log(err)
              }
            }
          }
          />}
        >接单</Item>
      </List>
      <WhiteSpace size="md" />
      </div>:null}
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
    <WhiteSpace size="md" />
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
  },
  setWhetherOrder(data){
    return {
      type:SET_ACCEPT_ORDER_STATUS,
      data
    }
  }
})(createForm()(HomePage))