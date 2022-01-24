import { haloBaseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method addCnRegionAllArea 获取halo博客博主信息
 * @param {*} data
 */
const haloGetApiContentUsersProfile = (data = {}) => {
  return haloGet({
    url: haloBaseUrl + "/api/content/users/profile",
    data,
  });
};

export default {
  haloGetApiContentUsersProfile,
};
