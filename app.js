const { CONTENT_DB } = require('./utils/content-db')
const { isLoggedIn } = require('./utils/auth')

App({
  onLaunch() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    this.globalData.statusBarHeight = systemInfo.statusBarHeight

    // 初始化历史记录
    const history = wx.getStorageSync('assessment_history')
    if (!history) wx.setStorageSync('assessment_history', [])

    // 检查登录态
    this.globalData.isLoggedIn = isLoggedIn()
  },

  onShow() {
    // 每次切回前台刷新登录态
    this.globalData.isLoggedIn = isLoggedIn()
  },

  globalData: {
    systemInfo: null,
    statusBarHeight: 20,
    isLoggedIn: false,
    CONTENT_DB: CONTENT_DB,
    brand: {
      name: '飞昂叩启教练学院',
      subtitle: '查理·佩勒林博士 4D 领导力系统',
      description: '24 道情境题，8 分钟，生成你专属的四色能量矩阵报告与 AMBR 跃迁路径图。',
      tagline: '当你可以看到差异，智慧就产生了'
    }
  }
})
