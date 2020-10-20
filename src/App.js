import React from 'react';
import {HashRouter as Router,Route}from 'react-router-dom'
import Routers from '@/plugins/libs/routerMap'
import {connect} from 'react-redux'
import {CLIENT_INTERFACE}from '@/plugins/libs/interfaceMap'
import {SET_USER_INFO,SET_REDIRECT}from '@/store/actions'
import axios from 'axios'
import {getStorage}from '@/plugins/common/storage'
import { Toast} from 'antd-mobile';
import Main from '@/views/Main';
// import Login from '@/views/Login'


class App extends React.Component{
  async componentDidMount(){
    await this.fetchCheckLogin()
  }
  //是否已经登录过及查证token是否是有效登录，并更新token
  fetchCheckLogin=async()=>{
    //用户是否已经登录过了
    if(this.props.user.isAuth){
      if(window.location.pathname==='/login') {window.location.pathname='/main/home'}
      return
    }
    //本地是否有存储用户信息
    let storageUserInfo=getStorage('storageUserInfo')
    if(!storageUserInfo){
      // this.goLogin()
      return
    }
    //本地存储的用户信息不能为空
    if(!storageUserInfo.accountId||!storageUserInfo.accountType||!storageUserInfo.token){
      // this.goLogin()
      return
    }
    //根据本地存储的用户信息，进行请求token是否有效登录，如果有效则更新token值
    try{
      let res = await axios({
        url: CLIENT_INTERFACE.CHECK_IS_LOGIN,
        method: 'post',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        data:{ ...storageUserInfo}
      })
      if(res.data.err!=='0'){
        Toast.info(res.data.msg, 1);
        return
      }
      let userData = { ...storageUserInfo, token:res.data.result.token}
      this.props.setUserInfo(userData)
      if(window.location.pathname==='/login') {window.location.pathname='/main/home'}
      console.log('已经登录了')
      }catch(err){
        console.log(err)
        Toast.info('请求异常', 1); //需删除
      }
  }
  render(){
    let isAuth=this.props.user.isAuth
    return (

      <Router>
        {Routers.map((item,index)=>{
          if(item.path!=='/login'){
          // return (<Route path={item.path} key={index} exact component={item.isAuth&&!isAuth?Login:item.component}></Route>)
          return (<div key={index}>
            <Route path={item.path} key={index} exact={item.exact} component={item.component}></Route></div>)
        }else{
          return (<Route path={item.path} key={index} exact component={isAuth?Main:item.component}></Route>)
        }
        })}

      </Router>
    );
  }
}

export default connect((state,props)=>{
	return state
},{
	setUserInfo(data){
		return{
			type:SET_USER_INFO,
			data
		}
  },
  setRedirectPath(data){
    return{
      type:SET_REDIRECT,
      data
    }
  }
})(App)
