/**
 * 主页面中的 "首页" "任务" "我的" 三个主页面
 */
import React from 'react';
import Home from '@/components/main/Home';
import My from '@/components/main/My';
import Task from '@/components/main/Task';
import { HomeOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons';
/**
 * main页面，的值
 * @param {*} type:类型
 * @param {*} title:标题
 * @param {*} headerName:头部标题
 * @param {*} icon:下边按钮的图标
 * @param {*} component:body位置的组件
 */
export const mainPageMap = [
  {
    type: 'home',
    title: '首页',
    headerName: '首页',
    icon(){return (<HomeOutlined className="mainIcon" />)},
    component (that) {return (<Home parent={ that } />)}
  },
  {
    type: 'task',
    title: '任务',
    headerName: '任务列表',
    icon () { return (<CopyOutlined className="mainIcon" />) },
    component (that) {return (<Task parent={ that } />)}
  },
  {
    type: 'my',
    title: '我的',
    headerName: '个人中心',
    icon () { return (<UserOutlined className="mainIcon" />) },
    component (that) {return (<My parent={ that } />)}
  },
];

export const mainTypeMatch = (type) => mainPageMap.find((res) => res.type === type) || mainPageMap[0];
