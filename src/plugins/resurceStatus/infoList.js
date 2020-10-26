import {
  SendOutlined, AuditOutlined, DashboardOutlined, FileExcelOutlined, HistoryOutlined, RollbackOutlined,
} from '@ant-design/icons';
import React from 'react';

export const infoListArr = [
  {
    infoStatus: '0',
    title: '发布任务',
    icon() { return (<SendOutlined style={ { color: '#77cc99' } } className="homeMenuIcon" />) },
    text: '发布任务    一键搞定',
  },
  {
    infoStatus: '1',
    title: '审核通知',
    icon() { return(<AuditOutlined style={{ color: '#FF9758' }} className="homeMenuIcon" />)},
  },
  {
    infoStatus: '2',
    title: '临期通知',
    icon() { return(<DashboardOutlined style={{ color: '#F2554F' }} className="homeMenuIcon" />)},
  },
  {
    infoStatus: '3',
    title: '拒单通知',
    icon() { return(<FileExcelOutlined style={{ color: '#0092FF' }} className="homeMenuIcon" />)},
  },
  {
    infoStatus: '4',
    title: '退单通知',
    icon() { return(<RollbackOutlined style={{ color: '#BF00DE' }} className="homeMenuIcon" />)},
  },
  {
    infoStatus: '5',
    title: '超期通知',
    icon () {return (<HistoryOutlined style={ { color: '#FF0900' } } className="homeMenuIcon" />) },
  },
];

export const infoListMatch = (status) => infoListArr.find((item) => item.infoStatus === status);
