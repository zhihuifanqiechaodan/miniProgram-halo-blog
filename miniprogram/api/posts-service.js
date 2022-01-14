import { baseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method haloGetApiContentPosts 获取halo博客文章
 * @param {*} data
 */
const haloGetApiContentPosts = (data = {}, id = "") => {
  return haloGet({
    url: baseUrl + `/api/content/posts/${id}`,
    data,
  });
};

export default {
  haloGetApiContentPosts,
};
