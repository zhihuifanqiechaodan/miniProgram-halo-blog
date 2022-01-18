// packageA/pages/article-detail/index.js
const { getService, globalData, dayjs, isExternal, baseUrl } = getApp();

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
    userInfo: null, // 博主信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    const { userInfo } = globalData;
    this._data.id = id;
    this.setData({
      userInfo,
    });
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
    return new Promise(async (reslove, reject) => {
      try {
        const { id } = this._data;
        const response = await getService(
          "PostsService"
        ).haloGetApiContentPosts(
          {
            formatDisabled: false,
            sourceDisabled: true,
          },
          id
        );
        const { thumbnail, createTime } = response;
        response.thumbnail = isExternal(thumbnail)
          ? thumbnail
          : baseUrl + thumbnail;
        response.createTime = dayjs(createTime).format("YYYY-MM-DD");
        reslove(response);
      } catch (error) {
        console.log(error);
      }
    });
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    const articleInfo = await this.haloGetApiContentPosts();
    this.setData({
      articleInfo,
    });
  },
});
