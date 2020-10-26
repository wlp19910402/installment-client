/**
 * 修改密码
 */
import React, { Component } from 'react';
import {
  List, InputItem, WhiteSpace, Button, WingBlank, Flex, Toast,
} from 'antd-mobile';
import NavHeader from '@/components/common/NavHeader';
import { createForm } from 'rc-form';
// import {regexp} from '@/plugins/common/regexp'
import { CLEAR_USER_INFO } from '@/store/actions';
import { connect } from 'react-redux';
import { CLIENT_INTERFACE } from '@/plugins/libs/interfaceMap';
import axios from '@/plugins/requestServer/httpClient';
import PropTypes from 'prop-types'

class UpdatePassword extends Component {

  componentDidMount() {
    document.body.querySelector('.qm-login-page').style.height = `${window.innerHeight}px`;
  }
  async tiggerUpdatePwd () {
    const { getFieldValue } = this.props.form;
    const oldPwd = getFieldValue('oldPwd');
    const newPwd1 = getFieldValue('newPwd1');
    const newPwd2 = getFieldValue('newPwd2');
    if (!oldPwd || !newPwd1 || !newPwd2) {
      Toast.info('账号和密码不能为空', 1);
      return;
    }
    // 基本验证通过，请求登录
    try {
      const res = await axios.post(CLIENT_INTERFACE.UPDATE_PWD, { oldPwd, newPwd1, newPwd2 });
      if (res.data.err !== '0') {
        Toast.info(res.data.msg, 1);
        return;
      }
      this.props.clearUserInfo();
      const that = this;
      Toast.info('修改密码成功，即将跳转到登录，请重新登录', 1);
      setTimeout(() => {
        that.props.history.replace('/login');
      }, 1000);
    } catch (err) {
      console.log(err);
      Toast.info('请求异常', 1); // 需删除
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="qm-main-page">
        <NavHeader />
        <div className="qm-login-page qm-fill-width ">
          <div className="qm-title-box sub-title">
            <div className="title">修改密码</div>
          </div>
          <Flex justify="center">
            <Flex.Item>
              <WingBlank size="lg">
                <List>
                  <InputItem {...getFieldProps('oldPwd')} type="password" placeholder="旧密码" />
                </List>
                <List>
                  <InputItem {...getFieldProps('newPwd1')} type="password" placeholder="新密码" />
                </List>
                <List>
                  <InputItem {...getFieldProps('newPwd2')} type="password" placeholder="新密码" />
                </List>
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <Button type="primary" onClick={this.tiggerUpdatePwd.bind(this)}>确定修改</Button>
                <WhiteSpace size="md" />
              </WingBlank>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes= {
  clearUserInfo: PropTypes.func,
  form:PropTypes.object
};
export default connect((state) => state, {
  clearUserInfo(data) {
    return {
      type: CLEAR_USER_INFO,
      data,
    };
  },
})(createForm()(UpdatePassword));
