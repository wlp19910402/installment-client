import { NavBar, Icon } from 'antd-mobile';
import React, { Component } from 'react';
import routerMap from '@/plugins/libs/routerMap';
import PropTypes from 'prop-types';

class NavHeaderCmp extends Component {
  constructor(...args) {
   super(...args);
    this.state = {
      title: '装修分期',
      back: true,
    };
  }
  componentDidMount() {
    const { hash } = window.location;
    const path = hash.substring(1, hash.length);
    const pathList = routerMap.find(res=>res.match(path));
    if (pathList) {
      this.setState({
        title: pathList.name || '装修分期',
        back: pathList.hasBack,
      });
    }
  }

  goBack() {
    window.history.back();
  }

  render() {
    return (
      <NavBar
        icon={this.state.back ? <Icon type="left" onClick={this.goBack} /> : null}
        mode="dark"
      >
        {this.props.title || this.state.title}
      </NavBar>
    );
  }
}
NavHeaderCmp.propTypes = {
  title: PropTypes.string
}

export default NavHeaderCmp;
