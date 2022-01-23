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

/**
 * @method reLaunch 封装reLaunch请求
 * @param {*} { url }
 */
const reLaunch = ({ url }) => {
  return new Promise((reslove, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.reLaunch({
        url,
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
 * @method isExternal 外部链接判断
 * @param {string} path
 * @returns {Boolean}
 */
const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * @method getCurrentPageInfo 获取当前页面栈中指定路径的页面信息
 * @param {*} path app.json中定义的完整路径
 */
const getCurrentPageInfo = (path) => {
  // 存在指定路径， 返回指定路径页面详情
  if (path) {
    // 反转数组，返回最后一次出现路由
    return getCurrentPages()
      .reverse()
      .find((item) => {
        return "/" + item.route === path;
      });

    // 反转数组,返回当前页面详情
  } else {
    return getCurrentPages().reverse()[0];
  }
};

export default {
  navigateTo,
  reLaunch,
  navigateBack,
  isExternal,
  getCurrentPageInfo,
};
