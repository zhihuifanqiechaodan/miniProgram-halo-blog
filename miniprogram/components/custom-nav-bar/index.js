// components/custom-nav-bar/index.js
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
  methods: {},
});
