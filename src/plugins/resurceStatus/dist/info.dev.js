"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeInfoMatch = exports.homeInfoArr = void 0;
var homeInfoArr = [{
  "infoStatus": "0",
  "title": "发布任务",
  "icon": "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png",
  "text": "发布任务  一键搞定"
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
exports.homeInfoArr = homeInfoArr;

var homeInfoMatch = function homeInfoMatch(status) {
  homeInfoArr.map(function (item) {
    return item.infoStatus === item ? item : [];
  });
};

exports.homeInfoMatch = homeInfoMatch;