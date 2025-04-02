"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isLogin: false,
      userInfo: {}
    };
  },
  onLoad(options) {
    common_vendor.index.__f__("log", "at pages/login/index.vue:17", "onload页面加载");
    common_vendor.index.__f__("log", "at pages/login/index.vue:18", "onload页面加载", options, options.id);
  },
  onShow() {
    common_vendor.index.__f__("log", "at pages/login/index.vue:22", "onShow页面显示");
  },
  onReady() {
    common_vendor.index.__f__("log", "at pages/login/index.vue:25", "onReady");
  },
  methods: {
    handleLogin() {
      this.handleWechatLogin();
    },
    async handleWechatLogin() {
      try {
        const userProfile = await this.getUserProfile();
        common_vendor.index.__f__("log", "at pages/login/index.vue:41", "userProfile", userProfile);
        const provider = await this.checkWechatProvider();
        const loginRes = await this.wechatLogin(provider);
        common_vendor.index.__f__("log", "at pages/login/index.vue:48", "code", loginRes.code);
        const token = await serverLogin(loginRes.code) || "ceshi123456";
        this.loginSuccess(userProfile, token);
      } catch (error) {
        this.handleLoginError(error);
      }
    },
    handleLoginError(error) {
      common_vendor.index.__f__("error", "at pages/login/index.vue:59", "登录失败:", error);
      common_vendor.index.showModal({
        title: "登录失败",
        content: error.message || "未知错误",
        showCancel: false
      });
    },
    // 检查微信登录支持情况
    checkWechatProvider() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getProvider({
          service: "oauth",
          success: (res) => {
            if (res.provider.includes("weixin")) {
              resolve("weixin");
            } else {
              reject(new Error("当前环境不支持微信登录"));
            }
          },
          fail: (err) => reject(err)
        });
      });
    },
    // 执行微信登录
    wechatLogin(provider) {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider,
          success: resolve,
          fail: reject
        });
      });
    },
    // 获取用户信息（需用户主动授权）
    getUserProfile() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserProfile({
          desc: "获取信息用于展示",
          success: (res) => {
            this.userInfo = {
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            };
            resolve(res.userInfo);
          },
          fail: (err) => reject(err)
        });
      });
    },
    // 服务器登录
    async serverLogin(code) {
      try {
        const res = await common_vendor.index.request({
          // url: 'https://your-api.com/login/wechat',
          method: "POST",
          data: {
            code
          },
          header: {
            "Content-Type": "application/json"
          }
        });
        if (res.statusCode === 200 && res.data.token) {
          return res.data.token;
        } else {
          throw new Error(res.data.message || "登录失败");
        }
      } catch (error) {
        throw new Error(`服务器请求失败: ${error.message}`);
      }
    },
    // 登录成功处理
    loginSuccess(userInfo, token) {
      common_vendor.index.setStorageSync("token", token);
      this.isLogin = true;
      this.userInfo = userInfo;
      common_vendor.index.$emit("loginStatusChange", true);
      common_vendor.index.showToast({
        title: "登录成功",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
