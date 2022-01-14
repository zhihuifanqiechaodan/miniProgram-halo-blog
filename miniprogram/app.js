// app.js
import { getService } from "./api/index";

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        this.globalData.isConnected = networkType === "none" ? false : true;
      },
    });

    // 监听网络状态变化事件
    wx.onNetworkStatusChange((value) => {
      const { isConnected } = value;
      this.globalData.isConnected = isConnected;
    });
  },
  getService, // 封装全局请求方法
  globalData: {
    isConnected: true, // 网络状态
    userInfo: null, // 用户信息
  },
});
