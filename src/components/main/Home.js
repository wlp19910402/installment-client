import React from 'react';
import { Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {Link}from'react-router-dom'
import NavHeader from '@/components/common/NavHeader'
import banner from '@/assets/img/home-banner.png'
class HomePage extends React.Component {
  // constructor(...args) {
	//   super(...args);
  // }
  render() {
    return (
      <div className="qm-fill-width ">
        <NavHeader/>
    <WingBlank size="lg">
    <WhiteSpace size="lg" />
    <Card><img src={banner}></img></Card>
    {[1,2,3,4,5].map((item)=>{
      return( <Card key={item}>
        <Card.Header
          title="This is title"
          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          extra={<span>首页哦</span>}
        />
        <Link to='/login'>去登录</Link>
        <Card.Body>
          <div>This is content of `Card`</div>
        </Card.Body>
        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
      </Card>)
    })}

    <WhiteSpace size="lg" />
  </WingBlank>
      </div>
    );
  }
}

export default HomePage;