import config from "./production.js"; // 生产环境
const { env, haloBaseUrl, apiAccessKey } = config;
// 版本号
const version = "1.0.0";

export { env, haloBaseUrl, apiAccessKey, version };
