import React from "react";
import { Flex, WingBlank, WhiteSpace, List, Badge } from "antd-mobile";
import { connect } from "react-redux";
import { infoListMatch } from "@/plugins/resurceStatus/infoList";
import PropTypes from "prop-types";
import { BellOutlined } from "@ant-design/icons";
import NavHeader from "@/components/common/NavHeader";
const { Item } = List;
const { Brief } = Item;

class HomePage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      ...infoListMatch("0"),
      subTextWith: `${window.innerWidth - 100}px`,
    };
  }
  render() {
    return (
      <div className="qm-main-page">
        <NavHeader />
        <WhiteSpace size="md" />
        <Flex direction="column" style={{ height: "100%" }}>
          <Flex.Item style={{ width: "100%", overflow: "auto" }}>
            <WingBlank size="lg">
              {["1", "2", "3", "4", "5"].map((item) => (
                <div key={item}>
                  <List>
                    <Item
                      style={{ overflow: "auto" }}
                      thumb={<BellOutlined style={{ color: "#77cc99", fontSize: "32px" }} />}
                      multipleLine
                    >
                      {infoListMatch(item).title}
                      <Badge
                        style={{ marginTop: "-16px", zIndex: 10, position: "absolute" }}
                        text={7 + parseInt(item)}
                        overflowCount={10}
                      />
                      <div style={{ float: "right", color: "#999" }} className="qm-body-1">
                        2020/10/20 10:30
                      </div>
                      <Brief style={{ width: this.state.subTextWith }}>
                        李宇轩完成了任务，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，资料已上传完成，请...
                      </Brief>
                      <Brief style={{ width: this.state.subTextWith }}>
                        李宇轩完成了任务，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，资料已上传完成，请...
                      </Brief>
                      <Brief style={{ width: this.state.subTextWith }}>
                        李宇轩完成了任务，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，，资料已上传完成，请李宇轩完成了任务，资料已上传完成，请...
                      </Brief>
                    </Item>
                  </List>
                  <WhiteSpace size="md" />
                </div>
              ))}
              <WhiteSpace size="md" />
            </WingBlank>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
HomePage.propTypes = {
  user: PropTypes.object,
  parent: PropTypes.object,
};

export default connect((state, props) => ({
  ...props,
  ...state,
}))(HomePage);
