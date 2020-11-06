/**
 * 经办人员发布任务
 */
import React, { Component } from 'react';
import {
  List, InputItem, WhiteSpace, Button, Flex ,Picker,WingBlank,DatePicker,TextareaItem
} from 'antd-mobile';
import NavHeader from '@/components/common/NavHeader';
import { createForm } from 'rc-form';
import { CLEAR_USER_INFO } from '@/store/actions';
import { connect } from 'react-redux';
// import { CLIENT_INTERFACE } from '@/plugins/libs/interfaceMap';
// import axios from '@/plugins/requestServer/httpClient';
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
      districtData:[]
    }
  }
  async componentDidMount () {
    let districtData = await getDistrictData()
     this.setState({
      districtData
    })
  }
  releaseTask () {
    const { getFieldValue } = this.props.form;
    let formObj = {
      serialId: getFieldValue('serialId'),
      name: getFieldValue('name'),
      phone: getFieldValue('phone'),
      district: getFieldValue('district'),
      addressDetail: getFieldValue('addressDetail'),
      sex: getFieldValue('sex'),
      date: getFieldValue('date'),
      note:getFieldValue('note')
    }
    console.log(formObj)
    return formObj
  }
  goPlace () {
    let { district, addressDetail } = this.releaseTask()
    console.log(district,addressDetail)
    // this.props.history.push(`/mapView/${district}${addressDetail}}`)
    this.props.history.push(`/mapView/北京市北京城区昌平区${addressDetail}`)
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
                <Picker extra="请选择所在地区"
                  data={this.state.districtData}
                  title="地区选择"
                  {...getFieldProps('district', {
                    initialValue: ['110000', '110100', "110114"],
                  }) }
                  >
                  <List.Item className="qm-district-picker" arrow="horizontal">所在地区</List.Item>
                  </Picker>
              </List>
              <List>
                <TextareaItem
                  { ...getFieldProps('addressDetail', {
                  initialValue:'沙河镇于辛庄村三号公寓409'
                })}
                    rows={ 1 }
                    title="详细地址"
                  placeholder="请输入详细地址"
              >详细地址</TextareaItem>
                </List>
              <List>
                <Picker
                  data={sexArr}
                  cols={1}
                  {...getFieldProps('sex', {
                    initialValue: [ '2' ],
                  }) }
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
                maxDate={ maxDate }
                {...getFieldProps('date', {
                    initialValue: now,
                }) }
            >
          <List.Item arrow="horizontal">任务结束日期</List.Item>
          </DatePicker>
              </List>
              <List>
              <TextareaItem
                {...getFieldProps('note')}
                rows={ 3 }
                title="任务说明"
                placeholder="请输入任务说明"
              />
              </List>
              <WhiteSpace size="xl" />
              <WingBlank size="lg">
                <Button type="primary" onClick={ this.releaseTask.bind(this) }>发布</Button>
              </WingBlank>
              <WingBlank size="lg">
                <Button type="error" onClick={ this.goPlace.bind(this) }>去已经获取到的路径位置</Button>
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
