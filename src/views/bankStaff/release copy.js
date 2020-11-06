/**
 * 经办人员发布任务
 */
import React, { Component } from 'react';
import {
  List, InputItem, WhiteSpace, Button, Flex, Toast ,Picker,Icon,WingBlank,DatePicker,TextareaItem
} from 'antd-mobile';
import NavHeader from '@/components/common/NavHeader';
import { createForm } from 'rc-form';
import { CLEAR_USER_INFO } from '@/store/actions';
import { connect } from 'react-redux';
import { CLIENT_INTERFACE } from '@/plugins/libs/interfaceMap';
import axios from '@/plugins/requestServer/httpClient';
import PropTypes from 'prop-types'
import {getDistrictData} from '@/store/actions/getDistrictData'
const sexArr = [
  {
    value: "1",
    label:"男"
  },
  {
    value: "2",
    label: "女"
  }
]
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = now;
const maxDate = new Date(nowTimeStamp + 30*24*60*60*1000);

class ReleaseTask extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      sex: [ '2' ],
      date: now,
      data: [],
      districtData:[]
    }
  }
  async componentDidMount () {
    let districtData = await getDistrictData()
     this.setState({
      districtData
    })
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
    onChangeSex (sex) {
    this.setState({
      sex: sex
    })
    }
  toSelectAddress () {
    this.props.history.push('/baiduMap')
  }
  toSelectAddress1 () {
    this.props.history.push('/gaodeMap')
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="qm-main-page">
        <NavHeader />
        <div className="qm-fill-width">
          <Flex justify="center">
            <Flex.Item>
                <List>
                  <InputItem { ...getFieldProps('serialId') } type="number" placeholder="请输入流水号" >
                    流水号
                  </InputItem>
              </List>
                <List>
                  <InputItem {...getFieldProps('name')} type="text" placeholder="请输入姓名" >姓名</InputItem>
                </List>
                <List>
                  <InputItem {...getFieldProps('phone')} type="text" placeholder="请输入手机号码" >手机号码</InputItem>
              </List>
              <List>
                <InputItem
            {...getFieldProps('address')}
            placeholder="点击选择地址"
            extra={<Icon type="right" size='md' color="#c2c2c2"/>}
            editable={ false }
            onClick={this.toSelectAddress.bind(this)}
          >住宅地址百度</InputItem>
              </List>
              <List>
                <Picker extra="请选择所在地区"

                  data={this.state.districtData}
                  title="地区选择"
                  {...getFieldProps('district', {
                    initialValue: ['120000', '120100', '120102'],
                  })}
                  onOk={e => console.log('ok', e)}
                  onDismiss={e => console.log('dismiss', e)}
                  >
                  <List.Item className="qm-district-picker" arrow="horizontal">所在地区</List.Item>
                  </Picker>
              </List>
              <List>
                <InputItem
            {...getFieldProps('address1')}
            placeholder="点击选择地址"
            extra={<Icon type="right" size='md' color="#c2c2c2"/>}
            editable={ false }
            onClick={this.toSelectAddress1.bind(this)}
          >住宅地址高德</InputItem>
              </List>
              <List>
                <TextareaItem
                {...getFieldProps('addressDetail')}
                      rows={ 1 }
                      title="详细信息"
                placeholder="请输入详细地址"
              >详细信息</TextareaItem>
                </List>
              <List>
                <Picker
                  data={sexArr}
                  value={this.state.sex}
                  cols={1}
                  onChange={this.onChangeSex.bind(this)}
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              </List>
              <List>
                <DatePicker
                mode="date"
                title="请选择日期"
                  extra="Optional"
                  minDate={minDate}
          maxDate={maxDate}
                value={this.state.date}
                onChange={date => this.setState({ date })}
            >
          <List.Item arrow="horizontal">任务结束日期</List.Item>
        </DatePicker>
              </List>
              <List>
              <TextareaItem
                {...getFieldProps('note1')}
                      rows={ 3 }
                      title="任务说明"
                placeholder="请输入任务说明"
              />
              </List>
              <WhiteSpace size="xl" />
              <WingBlank size="lg">
                <Button type="primary" onClick={ this.tiggerUpdatePwd.bind(this) }>发布</Button>
              </WingBlank>
              <WhiteSpace size="md" />
            </Flex.Item>
          </Flex>
        </div>
      </div>
    );
  }
}

ReleaseTask.propTypes= {
  clearUserInfo: PropTypes.func,
  form: PropTypes.object
};
export default connect((state) => state, {
  clearUserInfo(data) {
    return {
      type: CLEAR_USER_INFO,
      data,
    };
  },
})(createForm()(ReleaseTask));
