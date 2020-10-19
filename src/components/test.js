import { Flex, WhiteSpace ,Button,Toast,} from 'antd-mobile';
import React,{Component}from 'react'
import {Link}from 'react-router-dom'
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const FlexExample = () => (
  <div className="flex-container">
    <div className="sub-title">Basic</div>
    <Flex>
      <Flex.Item><PlaceHolder /></Flex.Item>
    </Flex>
    <Link to="/login">去登陆哦</Link>

    <WhiteSpace size="lg" />
    {/* <Button type="primary" onClick={toLogin}>去登陆哦22</Button> */}
    <Flex justify="center">
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
      <PlaceHolder className="inline" />
    </Flex>
  </div>
);

function successToast() {
  Toast.success('Load success !!!', 1);
}

class Cmp1 extends Component{
	constructor(...args){
		super(...args)
		this.state={users:[]}
  }
    handleClick = ()=>{
      Toast.info('This is a toast tips !!!', 1);
  }
  toLogin(){
    this.props.history.push('/login')
  }
  render(){
    return (<div>
       <Button  type="primary" onClick={this.handleClick}>测试antd</Button>
       <Button type="warning" onClick={successToast}>loading</Button>
       <FlexExample/>
       <Button type="primary" onClick={this.toLogin.bind(this)}>去登陆哦</Button>
    </div>)
  }
}
export default Cmp1;