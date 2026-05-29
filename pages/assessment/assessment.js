// 答题页 —— 24 道强迫选择题
const { QUESTIONS } = require('../../utils/questions')
const { calculate4DScores, generateReportId } = require('../../utils/scoring')
const { saveResult, saveProgress, getProgress, clearProgress } = require('../../utils/storage')

Page({
  data: {
    question: null,
    index: 0,
    total: QUESTIONS.length,
    progress: 0,
    answers: [],
    animClass: 'card-enter',
    showToast: false,
    toastText: '',
    canGoBack: false
  },

  onLoad() {
    // 尝试恢复进度
    const saved = getProgress()
    if (saved && saved.index > 0 && saved.index < QUESTIONS.length) {
      this.setData({
        index: saved.index,
        answers: saved.answers || [],
        canGoBack: saved.index > 0,
        toastText: '已为你恢复至第 ' + (saved.index + 1) + ' 题',
        showToast: true
      })
      setTimeout(() => {
        this.setData({ showToast: false })
      }, 2400)
    }

    this.loadQuestion(saved ? saved.index : 0)
  },

  loadQuestion(idx) {
    const q = QUESTIONS[idx]
    // 注入选项字母 A/B/C/D
    const optionsWithLetter = q.options.map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }))
    const answered = this.data.answers.length > idx
    const progress = ((idx + (answered ? 1 : 0)) / QUESTIONS.length) * 100

    this.setData({
      question: { ...q, options: optionsWithLetter },
      index: idx,
      progress,
      canGoBack: idx > 0,
      animClass: 'card-enter'
    })
  },

  handleSelect(e) {
    const type = e.currentTarget.dataset.type
    const { index, answers } = this.data

    // 记录答案
    const next = [...answers]
    next[index] = type
    this.setData({ answers: next, animClass: 'card-exit' })

    setTimeout(() => {
      // 检查是否最后一题
      if (index + 1 >= QUESTIONS.length) {
        clearProgress()
        this.finish(next)
        return
      }

      const newIndex = index + 1
      this.setData({ index: newIndex })
      this.loadQuestion(newIndex)

      // 保存进度
      saveProgress({
        index: newIndex,
        answers: next
      })
    }, 300)
  },

  handleBack() {
    if (this.data.index === 0) return
    this.setData({ animClass: 'card-exit' })
    setTimeout(() => {
      const newIndex = this.data.index - 1
      this.setData({ index: newIndex })
      this.loadQuestion(newIndex)
    }, 200)
  },

  finish(answers) {
    // 转换为计分格式
    const scoredAnswers = answers.map(type => ({ type }))
    const result = calculate4DScores(scoredAnswers)

    const scores = {
      green: result.green,
      yellow: result.yellow,
      blue: result.blue,
      orange: result.orange
    }

    const reportId = generateReportId()
    const primaryType = result.primary

    // 保存到历史
    saveResult({
      scores,
      primaryType,
      reportId,
      createdAt: new Date().toISOString()
    })

    // 跳转结果页
    wx.redirectTo({
      url: '/pages/result/result?green=' + scores.green +
        '&yellow=' + scores.yellow +
        '&blue=' + scores.blue +
        '&orange=' + scores.orange +
        '&primary=' + primaryType +
        '&reportId=' + reportId
    })
  }
})
