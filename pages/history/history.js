// 历史记录页
const { getHistory, clearHistory } = require('../../utils/storage')
const { CONTENT_DB } = require('../../utils/content-db')

Page({
  data: {
    list: [],
    isEmpty: true
  },

  onShow() {
    this.loadHistory()
  },

  loadHistory() {
    const history = getHistory()
    const list = history.map(item => {
      const type = CONTENT_DB[item.primaryType]
      return {
        ...item,
        typeName: type ? type.name : item.primaryType,
        typeColor: type ? type.color : '#86868B',
        date: this.formatDate(item.createdAt || item.savedAt)
      }
    })
    this.setData({
      list,
      isEmpty: list.length === 0
    })
  },

  formatDate(isoStr) {
    if (!isoStr) return ''
    const d = new Date(isoStr)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    return mm + '/' + dd + ' ' + hh + ':' + mi
  },

  viewDetail(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/result/result?green=' + item.scores.green +
        '&yellow=' + item.scores.yellow +
        '&blue=' + item.scores.blue +
        '&orange=' + item.scores.orange +
        '&primary=' + item.primaryType +
        '&reportId=' + (item.reportId || '')
    })
  },

  clearAll() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          clearHistory()
          this.loadHistory()
        }
      }
    })
  }
})
