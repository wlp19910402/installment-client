import React from 'react';
import { Card, WingBlank, WhiteSpace} from 'antd-mobile';
import NavHeader from '@/components/common/NavHeader'
class HomePage extends React.Component {
  constructor(...args) {
	  super(...args);
		this.state={
		}
  }
  render() {
    return (
      <div className="qm-fill-width ">
        <NavHeader/>
    <WingBlank size="lg">
    <WhiteSpace size="lg" />
    <Card>
      <Card.Header
        title="This is title"
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<span>我的哦</span>}
      />
      <Card.Body>
        <div>This is content of `Card`</div>
      </Card.Body>
      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
    </Card>
    <WhiteSpace size="lg" />
  </WingBlank>
      </div>
    );
  }
}

export default HomePage;