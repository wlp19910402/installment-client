/**
 * 联系客服 页面
 */
import { WhiteSpace } from "antd-mobile";
import React, { Component } from "react";
import NavHeader from "@/components/common/NavHeader";
import { mainTypeMatch } from "@/plugins/libs/mainMap";
import { PhoneFilled } from "@ant-design/icons";
import PropTypes from "prop-types";

class Main extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: "home",
    };
  }

  componentDidMount() {
    this.setState({
      selectedTab: mainTypeMatch(this.props.match.params.type).type,
    });
  }

  render() {
    return (
      <div className="qm-main-page">
        <NavHeader />
        <div className="qm-main-content">
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <img src={import("@/assets/img/contact.png")} alt="contactIcon" />
          <WhiteSpace size="lg" />
          <span className="qm-text-wait">
            <PhoneFilled rotate="90"/> 010_8787989
          </span>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  match: PropTypes.object,
};

export default Main;
