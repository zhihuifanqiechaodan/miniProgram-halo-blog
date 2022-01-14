// components/custom-html/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    containerStyle: {}, // 设置容器的样式
    copyLink: true, // 是否允许外部链接被点击时自动复制
    domain: "", // 主域名（用于链接拼接）
    errorImg: "", // 图片出错时的占位图链接
    lazyLoad: true, // 是否开启图片懒加载
    loadingImg: "", // 图片加载过程中的占位图链接
    pauseVideo: true, // 是否在播放一个视频时自动暂停其他视频
    previewImg: true, // 是否允许图片被点击时自动预览
    scrollTable: true, // 是否给每个表格添加一个滚动层使其能单独横向滚动
    selectable: true, // 是否开启文本长按复制
    setTitle: true, // 是否将 title 标签的内容设置到页面标题
    showImgMenu: true, // 是否允许图片被长按时显示菜单
    tagStyle: {}, // 设置标签的默认样式
    useAnchor: false, // 是否使用锚点链接
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method initHtmlStyle 初始化html样式
     */
    initHtmlStyle() {
      this.setData({
        containerStyle:
          "margin: 20rpx; padding:10px;font-size: 16px;color: #353535;word-spacing: 0.8px;letter-spacing: 0.8px;border-radius: 16px;background-color:#FFFFFF;",
        tagStyle: {
          table:
            "border-collapse:collapse;border-top:1px solid gray;border-left:1px solid gray;margin: 28rpx 0;",
          th:
            "border-right:1px solid gray;border-bottom:1px solid gray;background: #ccc;",
          td: "border-right:1px solid gray;border-bottom:1px solid gray;",
          blockquote:
            " display: block;padding: 15px 1rem;font-size: 0.8em;padding-right: 15px;margin: 0.5em 0;border-left: 6px solid #dce6f0;background: #f2f7fb;overflow: auto;overflow-scrolling: touch; word-wrap: normal;word-break: normal;",
          ul: "padding-left: 15px;line-height: 1.85;",
          ol: "padding-left: 15px;line-height: 1.85;",
          li: "margin-bottom: 12px;line-height: 1.85;",
          h1:
            "font-size: 1.5em;line-height: 50px;font-weight: normal;text-align: center;",
          h2:
            "text-align: left;margin: 20px 10px 0px 0px;font-size: 18px;font-weight: 700;color: #222;display: inline-block;padding-left: 10px;border-left: 5px solid rgb(248, 57, 41);",
          h3: "font-size: 0.83em;line-height: 30px;margin-top:5px",
          h4: "font-size: 0.67em;line-height: 30px;",
          h5: "font-size: 0.50em;line-height: 30px;",
          p:
            "line-height: 1.85;margin: 0.8em 0;font-size: 16px;color: #353535;",
          code: "word-wrap:break-word;color:#EA5455 ;font-size:14px",
          strong: "font-weight: 700;color: rgb(248, 57, 41);",
          video: "width: 100%",
        },
      });
    },
  },
  lifetimes: {
    attached() {
      this.initHtmlStyle();
    },
  },
});
