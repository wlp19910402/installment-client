import React from 'react';
import { List, InputItem, WhiteSpace ,Button,WingBlank,Flex,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import {USER_IDNTITY,getIdntityName,getUnIdntityName} from '@/plugins/resurceStatus/user'
import {regexp} from '@/plugins/common/regexp'
import {SET_USER_INFO}from '@/store/actions'
import {connect} from 'react-redux'
import {CLIENT_INTERFACE}from '@/plugins/libs/interfaceMap'
import axios from '@/plugins/requestServer/httpClient'
class BasicInputExample extends React.Component {
  constructor(...args) {
	  super(...args);
		this.state={
      loginUserIdentity:USER_IDNTITY.BANK_STAFF
		}
  }
  componentDidMount(){
    this.setState({
      loginUserIdentity:this.props.user.accountType
    })
    document.body.querySelector(".qm-login-page").style.height = window.innerHeight + "px"
  }
  tiggerLogin = async() => {
    const { getFieldValue } = this.props.form;
    const accountId = getFieldValue('accountId');
    const password = getFieldValue('pwd');
    const accountType = this.state.loginUserIdentity;
    if(accountId===undefined||password===undefined){
      Toast.info('账号和密码不能为空', 1);
      return
    }
    if(!regexp.regMobile.test(accountId)){
      Toast.info('请输入正确的11位手机号', 1);
      return
    }
    //基本验证通过，请求登录
    try{
      let res = await axios.post(CLIENT_INTERFACE.LOGIN,{accountId,password,accountType})
      if(res.data.err!=='0'){
        Toast.info(res.data.msg, 1);
        return
      }
      let userData = { accountId,  accountType, ...res.data.result}
      this.props.setUserInfo(userData)
      if(this.props.history.location.pathname==='/login'){
        this.props.history.replace(this.props.user.redirectPath);
      }
      }catch(err){
        console.log(err)
        Toast.info('请求异常', 1); //需删除
      }
  }
  //切换身份登录
  switchIndtify=()=>{
    this.setState({
      loginUserIdentity:this.state.loginUserIdentity===USER_IDNTITY.FOREIGN_STAFF?USER_IDNTITY.BANK_STAFF:USER_IDNTITY.FOREIGN_STAFF
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="qm-login-page qm-fill-width ">
        <div className="qm-title-box sub-title">
          <div className="title">{getIdntityName(this.state.loginUserIdentity)}登录</div>
        </div>
        <Flex justify="center">
          <Flex.Item>
                <WingBlank size="lg">
                <List>
                  <InputItem {...getFieldProps('accountId')}  placeholder="账号"  type="text"></InputItem>
                </List>
                <List>
                  <InputItem {...getFieldProps('pwd')} type="password" placeholder="密码"></InputItem>
                </List>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <Button type="primary" onClick={this.tiggerLogin.bind(this)}>登录</Button>
                <WhiteSpace size="md"/>
                <Button type="default" onClick={this.switchIndtify.bind(this)}>切换为“{getUnIdntityName(this.state.loginUserIdentity)}人员”</Button>
                </WingBlank>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);

export default connect((state,props)=>{
	return state
},{
	setUserInfo(data){
		return{
			type:SET_USER_INFO,
			data
		}
  }
})(BasicInputExampleWrapper)