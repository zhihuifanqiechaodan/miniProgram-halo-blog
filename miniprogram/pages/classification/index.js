// pages/classification/index.js
import Toast from "@vant/weapp/toast/toast";

const { getService, systemInfo } = getApp();

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    refreshInfo: null, // 刷新详情
  },
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [], // 分类列表
    currentTab: 0, // 默认展示的tab下标
    articles: null, // 文章列表详情
    systemInfo, // 设备信息
    brokenNetwork: false, // 网络状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  /**
   * @method haloGetApiContentCategories 获取halo博客分类
   */
  haloGetApiContentCategories() {
    return new Promise(async (reslove, reject) => {
      try {
        const categories = await getService(
          "CategoriesService"
        ).haloGetApiContentCategories();
        const tabs = categories.map((item) => {
          return {
            name: item.name,
          };
        });
        tabs.unshift({
          name: "全部",
        });
        tabs.forEach((item, index) => {
          item.index = index;
          item.page = 0; // 页码
          item.size = 10; // 页码
          item.data = []; // 商品列表
          item.empty = false; // 数据状态, 用于初次加载没有数据展示
          item.nomore = false; // 没有更多
          item.lowerLoading = false; // 上拉加载状态
          item.refresherTriggered = false; // 下拉刷新状态
        });
        reslove(tabs);
      } catch (error) {
        Toast.clear();
        this._data.refreshInfo = {
          method: "initData",
          params: {},
        };
        this.setData({
          brokenNetwork: true,
        });
      }
    });
  },
  /**
   * @method haloGetApiContentCategoriesPosts 获取halo博客分类文章列表
   */
  haloGetApiContentCategoriesPosts() {
    return new Promise(async (reslove, reject) => {
      const { currentTab, tabs } = this.data;
      const tabInfo = tabs[currentTab];
      const { name, page, size } = tabInfo;
      const articles = await getService(
        "CategoriesService"
      ).haloGetApiContentCategoriesPosts(
        {
          page,
          size,
        },
        name
      );
      reslove(articles);
    });
  },
  /**
   * @method haloGetApiContentStatistics 获取halo博客文章
   */
  haloGetApiContentPosts() {
    return new Promise(async (reslove, reject) => {
      const { currentTab, tabs } = this.data;
      const tabsInfo = tabs[currentTab];
      const { page, size } = tabsInfo;
      const articles = await getService("PostsService").haloGetApiContentPosts({
        page,
        sort: "topPriority,createTime,desc",
        size,
      });
      reslove(articles);
    });
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    Toast.loading({
      message: "加载中...",
      duration: 0,
      forbidClick: true,
    });
    const { currentTab } = this.data;
    const tabs = await this.haloGetApiContentCategories();
    this.setData({
      tabs,
    });
    const articles = currentTab
      ? await this.haloGetApiContentCategoriesPosts()
      : await this.haloGetApiContentPosts();
    const { content, isEmpty, isLast } = articles;
    const key = `tabs[${currentTab}].data`;
    const key1 = `tabs[${currentTab}].empty`;
    const key2 = `tabs[${currentTab}].nomore`;
    this.setData({
      [key]: content,
      [key1]: isEmpty,
      [key2]: isLast,
    });
    Toast.clear();
  },
  /**
   * @method tabsChange 分类切换
   * @param {*} e
   */
  async tabsChange(e) {
    const { index: currentTab } = e.detail;
    const { tabs } = this.data;
    const tabsInfo = tabs[currentTab];
    const { data } = tabsInfo;
    this.setData({
      currentTab,
    });
    // 数据不存在，重新请求一次
    if (!data.length) {
      Toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });
      const articles = currentTab
        ? await this.haloGetApiContentCategoriesPosts()
        : await this.haloGetApiContentPosts();
      const { content, isEmpty, isLast } = articles;
      const key = `tabs[${currentTab}].data`;
      const key1 = `tabs[${currentTab}].empty`;
      const key2 = `tabs[${currentTab}].nomore`;
      this.setData({
        [key]: content,
        [key1]: isEmpty,
        [key2]: isLast,
      });
      Toast.clear();
    }
  },
  /**
   * @method scrolltolower 滚动到底部
   */
  async scrolltolower() {
    const { currentTab } = this.data;
    const { tabs } = this.data;
    const tabsInfo = tabs[currentTab];
    const { data, nomore, lowerLoading, page } = tabsInfo;
    const key = `tabs[${currentTab}].data`;
    const key1 = `tabs[${currentTab}].empty`;
    const key2 = `tabs[${currentTab}].nomore`;
    const key3 = `tabs[${currentTab}].page`;
    const key4 = `tabs[${currentTab}].lowerLoading`;
    if (nomore || lowerLoading) return;
    this.setData({
      [key3]: page + 1,
      [key4]: true,
    });
    const articles = currentTab
      ? await this.haloGetApiContentCategoriesPosts()
      : await this.haloGetApiContentPosts();
    const { content, isEmpty, isLast } = articles;
    this.setData({
      [key]: data.concat(content),
      [key1]: isEmpty,
      [key2]: isLast,
      [key4]: false,
    });
  },
  /**
   * @method refresherrefresh 下拉刷新
   */
  async refresherrefresh() {
    const { currentTab } = this.data;
    const key = `tabs[${currentTab}].data`;
    const key1 = `tabs[${currentTab}].empty`;
    const key2 = `tabs[${currentTab}].nomore`;
    const key3 = `tabs[${currentTab}].refresherTriggered`;
    const key4 = `tabs[${currentTab}].page`;
    this.setData({
      [key4]: 0,
    });
    const articles = currentTab
      ? await this.haloGetApiContentCategoriesPosts()
      : await this.haloGetApiContentPosts();
    const { content, isEmpty, isLast } = articles;
    this.setData({
      [key]: content,
      [key1]: isEmpty,
      [key2]: isLast,
      [key3]: false,
    });
  },
});
