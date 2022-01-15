// pages/classification/index.js
const { getService } = getApp();

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    page: 0, // 页码
    size: 5, // 数量
  },
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [], // 分类列表
    currentTab: 0, // 默认展示的tab下标
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
    return getService("CategoriesService").haloGetApiContentCategories();
  },
  /**
   * @method haloGetApiContentCategoriesPosts 获取halo博客分类文章列表
   */
  haloGetApiContentCategoriesPosts() {
    return getService("CategoriesService").haloGetApiContentCategoriesPosts();
  },
  /**
   * @method haloGetApiContentStatistics 获取halo博客文章
   */
  haloGetApiContentPosts() {
    const { page, size } = this._data;
    return getService("PostsService").haloGetApiContentPosts({
      page,
      sort: "topPriority,createTime,desc",
      size,
    });
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    const categories = await this.haloGetApiContentCategories();
    const tabs = categories.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    tabs.unshift({
      id: "",
      name: "全部",
    });
    this.setData({
      tabs,
    });
    const articles = await this.haloGetApiContentPosts();
    this.setData({
      articles,
    });
  },
});
