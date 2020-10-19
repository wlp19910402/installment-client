"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoListMatch = exports.infoListArr = void 0;

var _paperPlane = _interopRequireDefault(require("@/assets/img/paper-plane.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var infoListArr = [{
  "infoStatus": "0",
  "title": "发布任务",
  "icon": _paperPlane["default"],
  "text": "发布任务    一键搞定"
}, {
  "infoStatus": "1",
  "title": "审核通知",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" // "text":"发布任务  一键搞定"

}, {
  "infoStatus": "2",
  "title": "临期通知",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" // "text":"发布任务  一键搞定"

}, {
  "infoStatus": "3",
  "title": "拒单通知",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" // "text":"发布任务  一键搞定"

}, {
  "infoStatus": "4",
  "title": "退单通知",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" // "text":"发布任务  一键搞定"

}, {
  "infoStatus": "5",
  "title": "超期通知",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" // "text":"发布任务  一键搞定"

}];
exports.infoListArr = infoListArr;

var infoListMatch = function infoListMatch(status) {
  return infoListArr.find(function (item) {
    return item.infoStatus === status;
  });
};

exports.infoListMatch = infoListMatch;