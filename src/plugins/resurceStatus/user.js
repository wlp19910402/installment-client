export const USER_IDNTITY = {
  BANK_STAFF: "1", // 银行的经办人员
  FOREIGN_STAFF: "2", // 商家的外勤人员
};
// 获取当前用户的工作人员的类型
export const getIdntityName = function (e) {
  return e === USER_IDNTITY.FOREIGN_STAFF ? "外勤" : "经办";
};
// 获取当前用户的工作人员的非此类型
export const getUnIdntityName = function (e) {
  return e === USER_IDNTITY.FOREIGN_STAFF ? "经办" : "外勤";
};
// 切换用户类型
export const switchUserIndtity = function (e) {
  return e === USER_IDNTITY.FOREIGN_STAFF ? USER_IDNTITY.BANK_STAFF : USER_IDNTITY.FOREIGN_STAFF;
};
