import { TabBar } from "antd-mobile";
import React, { Component } from "react";
import NavHeader from "@/components/common/NavHeader";
import { mainPageMap, mainTypeMatch } from "@/plugins/libs/mainMap";
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

  componentDidUpdate(old_props, old_state) {
    const old_p_type = old_props.match.params.type;
    const new_p_type = this.props.match.params.type;
    if (old_p_type !== new_p_type) {
      console.log(old_state);
      this.setState({
        selectedTab: mainTypeMatch(this.props.match.params.type).type,
      });
    }
  }

  render() {
    return (
      <div className="qm-main-page">
        <NavHeader title={mainTypeMatch(this.props.match.params.type).headerName} />
        <TabBar unselectedTintColor="#888" tintColor="#77CC99" barTintColor="white">
          {mainPageMap.map((item, index) => (
            <TabBar.Item
              title={item.title}
              key={index}
              icon={item.icon()}
              selectedIcon={item.icon()}
              selected={this.state.selectedTab === item.type}
              onPress={() => {
                this.props.history.push(`/main/${item.type}`);
              }}
            >
              {item.component(this)}
            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    );
  }
}
Main.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};
export default Main;
