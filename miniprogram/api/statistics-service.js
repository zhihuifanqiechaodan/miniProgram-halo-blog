import { haloBaseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method haloGetApiContentStatistics 获取halo博客统计信息
 * @param {*} data
 */
const haloGetApiContentStatistics = (data = {}) => {
  return haloGet({
    url: haloBaseUrl + "/api/content/statistics",
    data,
  });
};

export default {
  haloGetApiContentStatistics,
};
