// pages/home/index.js
const { getService } = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1, // 轮播图默认下标
    posterList: [
      {
        id: "1",
        image:
          "https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp",
      },
      {
        id: "2",
        image:
          "https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp",
      },
      {
        id: "3",
        image:
          "https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp",
      },
      {
        id: "4",
        image:
          "https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp",
      },
    ],
    banners: [], // 轮播图
    statisticsInfo: null, // 博客统计信息
    articles: [], // 文章列表
  },
  swiperChange(event) {
    let { current } = event.detail;
    this.setData({
      currentIndex: current,
    });
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
   * @method haloGetApiContentStatistics 获取halo博客统计信息
   */
  haloGetApiContentStatistics() {
    return getService("StatisticsService").haloGetApiContentStatistics();
  },
  /**
   * @method haloGetApiContentStatistics 获取halo博客文章
   * @param {*} params
   */
  haloGetApiContentPosts(params) {
    const { page, sort, size } = params;
    return getService("PostsService").haloGetApiContentPosts({
      page,
      sort,
      size,
    });
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    const bannerInfo = await this.haloGetApiContentPosts({
      page: 0,
      sort: "visits,desc",
      size: 3,
    });
    const statisticsInfo = await this.haloGetApiContentStatistics();
    const postsInfo = await this.haloGetApiContentPosts({
      page: 0,
      sort: "topPriority,createTime,desc",
      size: 10,
    });
    this.setData({
      banners: bannerInfo.content,
      statisticsInfo,
      articles: postsInfo.content,
    });
  },
});
