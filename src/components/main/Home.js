import React from 'react';
import {
  Card, WingBlank, WhiteSpace, List, Badge
} from 'antd-mobile';
import { connect } from 'react-redux';
import banner from '@/assets/img/home-banner.png';
import { infoListMatch } from '@/plugins/resurceStatus/infoList';
import { USER_IDNTITY } from '@/plugins/resurceStatus/user';
import PropTypes from 'prop-types';
const { Item } = List;
const { Brief } = Item;

class HomePage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ...infoListMatch('0'),
      subTextWith: `${window.innerWidth - 100}px`,
    };
  }
  render() {
    return (
      <div className="qm-fill-width qm-main-home">
        <WingBlank size="md">
          <WhiteSpace size="md" />
          <Card><img src={ banner } alt="banner" /></Card>
          <WhiteSpace size="md" />
          {this.props.user.accountType === USER_IDNTITY.BANK_STAFF ? (
            <div>
              <List>
                <Item
                  arrow="horizontal"
                  thumb={this.state.icon()}
                  multipleLine
                  onClick={() => {this.props.parent.props.history.push('/bankStaff/release')}}
                >
                  {this.state.title}
                  {' '}
                  <Brief>{this.state.text}</Brief>
                </Item>
              </List>
              <WhiteSpace size="md" />
            </div>
          ) : null}
          {['1', '2', '3', '4', '5'].map((item) => (
            <div key={item}>
              <List>
                <Item
                  style={{ overflow: 'auto' }}
                  thumb={infoListMatch(item).icon()}
                  multipleLine
                  onClick={() => {}}
                >
                  {infoListMatch(item).title}
                  <Badge style={{ marginTop: '-16px', zIndex: 10, position: 'absolute' }} text={7 + parseInt(item)} overflowCount={10} />
                  <div style={{ float: 'right', color: '#999' }} className="qm-body-1">2020/10/20 10:30</div>
                  <Brief style={{ width: this.state.subTextWith }}>李宇轩完成了任务，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，资料已上传完成，请...</Brief>
                </Item>
              </List>
              <WhiteSpace size="md" />
            </div>
          ))}
        </WingBlank>
      </div>
    );
  }
}
HomePage.propTypes = {
  user: PropTypes.object,
  parent: PropTypes.object
}

export default connect((state, props) => ({
  ...props,
  ...state,
}))(HomePage);
