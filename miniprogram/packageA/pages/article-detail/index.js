// packageA/pages/article-detail/index.js
const { getService } = getApp();

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    id: "", // 文章id
  },
  /**
   * 页面的初始数据
   */
  data: {
    articleInfo: null, // 文章详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this._data.id = id;
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
   * @method haloGetApiContentStatistics 获取halo博客文章
   */
  haloGetApiContentPosts() {
    const { id } = this._data;
    return getService("PostsService").haloGetApiContentPosts(
      {
        formatDisabled: false,
        sourceDisabled: true,
      },
      id
    );
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    const articleInfo = await this.haloGetApiContentPosts();
    this.setData({
      articleInfo,
    });
    console.log(articleInfo);
  },
});
