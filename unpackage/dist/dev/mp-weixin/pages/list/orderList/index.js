"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_count = require("../../../store/count.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const countStore = store_count.useCountStore();
    common_vendor.index.__f__("log", "at pages/list/orderList/index.vue:20", "@@@", countStore.sum);
    function add() {
      countStore.increment(6);
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(common_vendor.unref(countStore).sum),
        c: common_vendor.o(add)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/list/orderList/index.js.map
