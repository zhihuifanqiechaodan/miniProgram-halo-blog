import Toast from "@vant/weapp/toast/toast";

/**
 * @method navigateTo 封装navigateTo请求
 * @param {*} { url, events }
 */
const navigateTo = ({ url, events = {} }) => {
  return new Promise((reslove, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateTo({
        url,
        events,
        success: reslove,
        fail: reject,
      });

      // 无网络
    } else {
      Toast("似乎已经断开了与互联网的连接");
    }
  });
};

/**
 * @method navigateBack 封装navigateBack请求
 * @param {*} delta
 */
const navigateBack = (delta = 1) => {
  return new Promise((reslove, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateBack({
        delta,
        success: reslove,
        fail: reject,
      });

      // 无网络
    } else {
      Toast("似乎已经断开了与互联网的连接");
    }
  });
};

export default {
  navigateTo,
  navigateBack,
};
