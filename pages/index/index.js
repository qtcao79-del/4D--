// 首页 —— 飞昂叩启教练学院 · 查理博士 4D 领导力系统
const { CONTENT_DB, TYPE_ORDER } = require('../../utils/content-db')
const { isLoggedIn, getUser } = require('../../utils/auth')

Page({
  data: {
    colors: [],
    brand: {},
    statusBarHeight: 44,
    userName: '',
    isLoggedIn: false
  },

  onLoad() {
    const app = getApp()
    const systemInfo = wx.getSystemInfoSync()
    const loggedIn = isLoggedIn()

    // 新用户 → 注册页
    if (!loggedIn) {
      const hasSkipped = wx.getStorageSync('4d_skip_register')
      if (!hasSkipped) {
        wx.navigateTo({ url: '/pages/register/register' })
      }
    }

    // 构建四色预览数据
    const colors = TYPE_ORDER.map(key => {
      const t = CONTENT_DB[key]
      const jungMatch = t.jung.match(/\(([^)]+)\)/)
      const jungCn = jungMatch ? jungMatch[1].split('+').map(s => s.trim().split(/\s+/)[0]).join(' + ') : ''
      return {
        key,
        name: t.name.split(' · ')[0],
        typeName: t.name.split(' · ')[1] || '',
        subtitle: t.subtitle,
        jungCn,
        color: t.color,
        colorVar: t.colorVar
      }
    })

    const user = getUser()

    this.setData({
      colors,
      brand: app.globalData.brand,
      statusBarHeight: systemInfo.statusBarHeight || 44,
      userName: user ? user.name : '',
      isLoggedIn: loggedIn
    })
  },

  onShow() {
    // 每次显示时刷新登录态
    const loggedIn = isLoggedIn()
    const user = getUser()
    this.setData({
      isLoggedIn: loggedIn,
      userName: user ? user.name : ''
    })
  },

  startQuiz() {
    wx.switchTab({ url: '/pages/assessment/assessment' })
  }
})
