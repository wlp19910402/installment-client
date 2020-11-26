import React from "react";
import { Icon, WhiteSpace, Button, Flex, WingBlank } from "antd-mobile";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import NavHeader from "@/components/common/NavHeader";
import "rc-menu/assets/index.css";
const data = [
  {
    key: "1",
    title: "北京亚大创新科技有限责任公司",
    children: [
      { key: "1-1", title: "李宇轩" },
      { key: "1-2", title: "张一诺" },
      { key: "1-3", title: "王小明" },
      {
        key: "1-4",
        title: "张三",
        children: [
          { key: "1-4-1", title: "李宇轩" },
          { key: "1-4-2", title: "张一诺" },
          { key: "1-4-3", title: "王小明" },
          { key: "1-4-4", title: "张三" },
        ],
      },
    ],
  },
  {
    key: "2",
    title: "北京蓝新科技有限责任公司",
    children: [
      { key: "2-1", title: "李宇轩" },
      { key: "2-2", title: "张一诺" },
      { key: "2-3", title: "王小明" },
    ],
  },
  {
    key: "3",
    title: "快手科技有限责任公司快手科技有限责任公司快手科技有限责任公司快手科技有限责任公司快手科技有限责任公司",
    children: [
      { key: "3-1", title: "李宇轩" },
      { key: "3-2", title: "张一诺" },
      { key: "3-3", title: "王小明" },
    ],
  },
];
const mapCmp = (data) => {
  return data.map((item) =>
    item.children ? (
      <SubMenu key={item.key} title={item.title}>
        {mapCmp(item.children)}
      </SubMenu>
    ) : (
      <MenuItem key={item.key}>
        <Icon className="qm-menu-cir" type="check-circle" size="xxs" />
        {item.title}
      </MenuItem>
    )
  );
};
class Test extends React.Component {
  state = {
    openKeys: [],
  };

  onClick(info) {
    console.log("click ", info);
  }

  onOpenChange = (openKeys) => {
    console.log("onOpenChange", openKeys);
    this.setState({
      openKeys,
    });
  };

  getMenu() {
    return (
      <Menu onClick={this.onClick} mode="inline" onOpenChange={this.onOpenChange} openKeys={this.state.openKeys}>
        {mapCmp(data)}
      </Menu>
    );
  }
  render() {
    return (
      <div className="qm-main-page qm-bg-white">
        <NavHeader />
        <Flex style={{ height: "100%", width: "100%" }} direction="column">
          <Flex.Item style={{ width: "100%", overflow: "auto" }}>
            <WingBlank size="lg">{this.getMenu()}</WingBlank>
            <WhiteSpace size="lg" />
          </Flex.Item>
          <div style={{ width: "100%" }}>
            <WingBlank size="lg">
              <WhiteSpace size="xs" />
              <Button type="primary">确定并指派</Button>
              <WhiteSpace size="xs" />
            </WingBlank>
          </div>
        </Flex>
      </div>
    );
  }
}

export default Test;
