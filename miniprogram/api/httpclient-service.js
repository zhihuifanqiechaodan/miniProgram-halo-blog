import { apiAccessKey } from "../config/index";

/**
 * @method haloInstance 封装 wx.request 请求，用于请求halo博客信息
 * @param {*} { method, url, data }
 */
const haloInstance = async ({ method, url, data }) => {
  const { globalData } = getApp();
  const { isConnected } = globalData;
  // 有网络
  if (isConnected) {
    return new Promise(async (reslove, reject) => {
      // 添加默认参数
      data.api_access_key = apiAccessKey;
      // 微信原生请求
      wx.request({
        url,
        data,
        method,
        success: async (value) => {
          const { statusCode, data: response } = value;
          // 请求正常
          if (statusCode === 200) {
            const { status, data } = response;
            switch (status) {
              case 200:
                reslove(data);
                break;

              default:
                break;
            }
            // 错误状态吗
          } else {
            reject("服务器请求错误，状态码：", statusCode);
          }
        },
        fail(reason) {
          reject(reason);
        },
      });
    });

    // 无网络
  } else {
    return Promise.reject("无网状态");
  }
};

/**
 * @method get haloGet请求
 * @param {*} { url, data}
 */
const haloGet = ({ url, data }) => {
  return haloInstance({
    url,
    data,
    method: "GET",
  });
};

export { haloGet };
