import Release from '@/assets/img/paper-plane.svg'
export const infoListArr=[
  {
    "infoStatus":"0",
    "title":"发布任务",
    "icon":Release,
    "text":"发布任务    一键搞定"
  },
  {
    "infoStatus":"1",
    "title":"审核通知",
    "icon":"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"2",
    "title":"临期通知",
    "icon":"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"3",
    "title":"拒单通知",
    "icon":"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"4",
    "title":"退单通知",
    "icon":"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
    // "text":"发布任务  一键搞定"
  },
  {
    "infoStatus":"5",
    "title":"超期通知",
    "icon":"https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
    // "text":"发布任务  一键搞定"
  }
]

export const infoListMatch=(status)=>{

 return infoListArr.find(item=>item.infoStatus===status)
}