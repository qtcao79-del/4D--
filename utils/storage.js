// 本地存储管理

const HISTORY_KEY = 'assessment_history'
const PROGRESS_KEY = 'quiz_progress'
const MAX_HISTORY = 50

/**
 * 保存测评结果到历史
 * @param {{ scores: object, primaryType: string, reportId: string, createdAt: string }} result
 */
function saveResult(result) {
  const history = getHistory()
  history.unshift({
    ...result,
    savedAt: new Date().toISOString()
  })
  // 限制最大条数
  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY
  }
  wx.setStorageSync(HISTORY_KEY, history)
}

/**
 * 获取历史记录
 * @returns {Array}
 */
function getHistory() {
  return wx.getStorageSync(HISTORY_KEY) || []
}

/**
 * 清除所有历史记录
 */
function clearHistory() {
  wx.setStorageSync(HISTORY_KEY, [])
}

/**
 * 保存答题进度（断点续答）
 * @param {{ index: number, answers: Array<{type: string}> }} progress
 */
function saveProgress(progress) {
  wx.setStorageSync(PROGRESS_KEY, progress)
}

/**
 * 获取答题进度
 * @returns {{ index: number, answers: Array } | null}
 */
function getProgress() {
  return wx.getStorageSync(PROGRESS_KEY) || null
}

/**
 * 清除答题进度
 */
function clearProgress() {
  wx.removeStorageSync(PROGRESS_KEY)
}

module.exports = {
  saveResult,
  getHistory,
  clearHistory,
  saveProgress,
  getProgress,
  clearProgress
}
