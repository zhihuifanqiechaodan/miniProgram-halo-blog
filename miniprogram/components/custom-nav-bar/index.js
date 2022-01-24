// components/custom-nav-bar/index.js
const { navigateBack, reLaunch, router } = getApp();

Component({
  options: {
    styleIsolation: "shared",
  },
  /**
   * 组件的属性列表
   */
  properties: {
    fixed: {
      // 是否固定在顶部
      type: Boolean,
      value: true,
    },
    placeholder: {
      // 固定在顶部时是否开启占位
      type: Boolean,
      value: false,
    },
    border: {
      // 是否显示下边框
      type: Boolean,
      value: false,
    },
    customStyle: {
      // 根节点自定义样式
      type: String,
      value: "background: rgba(255, 255, 255, 0)",
    },
    isHome: {
      // 是否显示左侧首页图标
      type: Boolean,
      value: false,
    },
    isBack: {
      //是否显示左侧返回图标
      type: Boolean,
      value: false,
    },
    isClose: {
      //是否显示左侧关闭图标
      type: Boolean,
      value: false,
    },
    isSlot: {
      // 是否开启左侧插槽
      type: Boolean,
      value: false,
    },
    title: {
      // 是否显示中间文案
      type: String,
      value: "",
    },
    goTop: {
      // 是否开启点击滚动到顶部
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method navigateBack 返回上一页
     */
    navigateBack() {
      navigateBack();
      this.triggerEvent("back");
    },
    /**
     * @method reLaunch 返回首页
     */
    reLaunch() {
      const { Home } = router;
      reLaunch({
        url: Home.path,
      });
    },
  },
  lifetimes: {
    attached() {
      const { Home, Classification, Account } = router;
      // 过滤路由列表
      const tabbarRoute = [];
      // 首页过滤
      tabbarRoute.push(Home.path);
      // 商列过滤
      tabbarRoute.push(Classification.path);
      // 账户过滤
      tabbarRoute.push(Account.path);
      // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
      const pages = getCurrentPages();
      // 如果当前页面栈只有一层
      if (pages.length === 1) {
        const route = pages[0].route;
        // 不是tabbar页面则显示返回首页
        if (!tabbarRoute.includes("/" + route)) {
          this.setData({
            isHome: true,
            isBack: false,
          });
        }
      }
    },
  },
});
