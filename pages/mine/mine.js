// 我的页面
const { getHistory } = require('../../utils/storage')
const { getUser, isLoggedIn, logout } = require('../../utils/auth')

Page({
  data: {
    historyCount: 0,
    appVersion: '2.0.0',
    isLoggedIn: false,
    user: null
  },

  onShow() {
    const history = getHistory()
    const loggedIn = isLoggedIn()
    const user = getUser()

    this.setData({
      historyCount: history.length,
      isLoggedIn: loggedIn,
      user: user
    })
  },

  goHistory() {
    wx.switchTab({ url: '/pages/history/history' })
  },

  goRegister() {
    wx.navigateTo({ url: '/pages/register/register' })
  },

  handleLogout() {
    wx.showModal({
      title: '退出登录',
      content: '退出后你的档案将暂时不可见，但测评记录不会丢失。',
      confirmText: '确认退出',
      success: (res) => {
        if (res.confirm) {
          logout()
          this.setData({
            isLoggedIn: false,
            user: null
          })
          wx.showToast({
            title: '已退出',
            icon: 'success'
          })
        }
      }
    })
  }
})
