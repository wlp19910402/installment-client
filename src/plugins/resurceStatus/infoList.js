import {SendOutlined,AuditOutlined,DashboardOutlined,FileExcelOutlined,HistoryOutlined,RollbackOutlined }from '@ant-design/icons'
import React from 'react';
export const infoListArr=[
  {
    "infoStatus":"0",
    "title":"发布任务",
    "icon":()=>(<SendOutlined style={{color:"#77cc99"}} className="homeMenuIcon"/>),
    "text":"发布任务    一键搞定"
  },
  {
    "infoStatus":"1",
    "title":"审核通知",
    "icon":()=>(<AuditOutlined style={{color:"#FF9758"}} className="homeMenuIcon"/>),
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"2",
    "title":"临期通知",
    "icon":()=>(<DashboardOutlined style={{color:"#F2554F"}} className="homeMenuIcon"/>),
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"3",
    "title":"拒单通知",
    "icon":()=>(<FileExcelOutlined style={{color:"#0092FF"}} className="homeMenuIcon"/>),
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"4",
    "title":"退单通知",
    "icon":()=>(<RollbackOutlined style={{color:"#BF00DE"}} className="homeMenuIcon"/>),
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"5",
    "title":"超期通知",
    "icon":()=>(<HistoryOutlined style={{color:"#FF0900"}} className="homeMenuIcon"/>),
    // "text":"发布任务  一键搞定"
  }
]

export const infoListMatch=(status)=>{
 return infoListArr.find(item=>item.infoStatus===status)
}