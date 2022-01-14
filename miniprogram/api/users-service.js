import { baseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method addCnRegionAllArea 获取halo博客用户信息
 * @param {*} data
 */
const haloGetApiContentUsersProfile = (data = {}) => {
  return haloGet({
    url: baseUrl + "/api/content/users/profile",
    data,
  });
};

export default {
  haloGetApiContentUsersProfile,
};
