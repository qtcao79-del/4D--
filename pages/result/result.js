// 结果页 —— 四色能量矩阵 + 完整 AMBR 报告
const { CONTENT_DB, TYPE_ORDER, KEY_MAP } = require('../../utils/content-db')

Page({
  data: {
    primary: null,
    primaryColor: '',
    primaryColorVar: '',
    scores: {},
    reportId: '',
    createdAt: '',
    animated: false,
    matrixData: []
  },

  onLoad(options) {
    const { green, yellow, blue, orange, primary, reportId } = options

    const scores = {
      green: parseInt(green) || 0,
      yellow: parseInt(yellow) || 0,
      blue: parseInt(blue) || 0,
      orange: parseInt(orange) || 0
    }

    const primaryType = primary || 'GREEN'
    const typeContent = CONTENT_DB[primaryType]

    // 构建矩阵数据
    const matrixData = TYPE_ORDER.map(key => {
      const t = CONTENT_DB[key]
      const score = scores[KEY_MAP[key]]
      const jungMatch = t.jung.match(/\(([^)]+)\)/)
      const jungShort = jungMatch ? jungMatch[1].split('+').map(s => s.trim().split(/\s+/)[0]).join(' + ') : ''
      return {
        key,
        name: t.name.split(' · ')[0],
        subtitle: t.subtitle,
        jungShort,
        score,
        isPrimary: key === primaryType,
        color: t.color,
        colorVar: t.colorVar
      }
    })

    this.setData({
      primary: typeContent,
      primaryColor: typeContent.color,
      primaryColorVar: typeContent.colorVar,
      scores,
      reportId: reportId || '',
      createdAt: new Date().toLocaleString('zh-CN'),
      matrixData
    })

    // 动画延迟
    setTimeout(() => {
      this.setData({ animated: true })
    }, 300)
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  retake() {
    wx.switchTab({ url: '/pages/assessment/assessment' })
  }
})
