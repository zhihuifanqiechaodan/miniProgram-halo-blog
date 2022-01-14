import { baseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method haloGetApiContentPosts 获取halo博客文章列表
 * @param {*} data
 */
const haloGetApiContentPosts = (data = {}) => {
  return haloGet({
    url: baseUrl + "/api/content/posts",
    data,
  });
};

export default {
  haloGetApiContentPosts,
};
