"use strict";
const common_vendor = require("../common/vendor.js");
const useCountStore = common_vendor.defineStore("count", {
  // actions里面放置的是一个一个的方法，用于响应组件中的“动作”
  actions: {
    increment(value) {
      common_vendor.index.__f__("log", "at store/count.ts:7", "increment被调用了", value);
      if (this.sum < 10) {
        this.sum += value;
      }
    }
  },
  // 真正存储数据的地方
  state() {
    return {
      sum: 1
    };
  }
});
exports.useCountStore = useCountStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/count.js.map
