import { baseUrl } from "../config/index";
import { haloGet } from "./httpclient-service";

/**
 * @method haloGetApiContentCategories 获取halo博客分类
 * @param {*} data
 */
const haloGetApiContentCategories = (data = {}) => {
  return haloGet({
    url: baseUrl + `/api/content/categories`,
    data,
  });
};

/**
 * @method haloGetApiContentCategoriesPosts 获取halo博客分类文章列表
 * @param {*} data
 */
const haloGetApiContentCategoriesPosts = (data = {}, id) => {
  return haloGet({
    url: baseUrl + `/api/content/categories/${id}/posts`,
    data,
  });
};

export default {
  haloGetApiContentCategories,
  haloGetApiContentCategoriesPosts
};
