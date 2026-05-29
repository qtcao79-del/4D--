// 注册页 —— 姓名 + 手机号快速注册
const { register, isLoggedIn } = require('../../utils/auth')

Page({
  data: {
    name: '',
    phone: '',
    company: '',
    role: '',
    loading: false,
    errorMsg: '',
    brand: {}
  },

  onLoad() {
    // 已注册用户直接跳首页
    if (isLoggedIn()) {
      wx.switchTab({ url: '/pages/index/index' })
      return
    }

    const app = getApp()
    this.setData({ brand: app.globalData.brand })
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value, errorMsg: '' })
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value, errorMsg: '' })
  },

  onCompanyInput(e) {
    this.setData({ company: e.detail.value })
  },

  onRoleInput(e) {
    this.setData({ role: e.detail.value })
  },

  async handleSubmit() {
    const { name, phone, company, role, loading } = this.data
    if (loading) return

    this.setData({ loading: true, errorMsg: '' })

    try {
      await register({ name, phone, company, role })

      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      })

      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' })
      }, 1600)

    } catch (err) {
      this.setData({ errorMsg: err.message, loading: false })
    }
  },

  handleSkip() {
    wx.showModal({
      title: '跳过注册',
      content: '不注册也可以体验测评，但测评结果将不会保存到你的档案中。',
      confirmText: '确认跳过',
      cancelText: '回去注册',
      success: (res) => {
        if (res.confirm) {
          // 标记已跳过，下次不再弹出
          wx.setStorageSync('4d_skip_register', true)
          wx.switchTab({ url: '/pages/index/index' })
        }
      }
    })
  }
})
