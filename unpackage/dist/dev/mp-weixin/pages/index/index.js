"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: 123
    };
  },
  methods: {
    handleNavToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/index",
        query: {
          id: 123,
          name: "uniapp"
        }
      });
    },
    handleSwitchTab() {
      common_vendor.index.switchTab({
        url: "/pages/list/orderList/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleNavToLogin && $options.handleNavToLogin(...args)),
    b: common_vendor.o((...args) => $options.handleSwitchTab && $options.handleSwitchTab(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
