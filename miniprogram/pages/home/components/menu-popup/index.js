// pages/home/components/menu-popup/index.js
const { getCurrentPageInfo, globalData } = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuPopup: {
      type: false,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: null, // 博主信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      const currentPageInfo = getCurrentPageInfo();
      currentPageInfo.setData({
        menuPopup: false,
      });
    },
  },
  lifetimes: {
    attached() {
      const { userInfo } = globalData;
      this.setData({
        userInfo,
      });
    },
  },
});
