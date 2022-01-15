// components/custom-article/index.js
const { navigateTo, router } = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleInfo: Object,
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
     * @method navigateToArticleDetail 跳转文章详情
     */
    navigateToArticleDetail() {
      const { articleInfo } = this.properties;
      const { id } = articleInfo;
      const { ArticleDetail } = router;
      navigateTo({
        url: `${ArticleDetail.path}?id=${id}`,
      });
    },
  },
});
