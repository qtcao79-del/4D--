// 强迫选择计分逻辑 —— 24 道题，每题选一个维度
// 平分极端情况：按 GREEN > BLUE > YELLOW > ORANGE 顺序选主导

/**
 * @param {Array<{type: string}>} answers - 每题选择的维度类型
 * @returns {{ green: number, yellow: number, blue: number, orange: number, primary: string }}
 */
function calculate4DScores(answers) {
  const counts = { GREEN: 0, YELLOW: 0, BLUE: 0, ORANGE: 0 }

  answers.forEach(a => {
    if (counts.hasOwnProperty(a.type)) {
      counts[a.type] += 1
    }
  })

  const total = counts.GREEN + counts.YELLOW + counts.BLUE + counts.ORANGE

  if (total === 0) {
    return { green: 25, yellow: 25, blue: 25, orange: 25, primary: 'GREEN' }
  }

  const percentages = {
    green: Math.round((counts.GREEN / total) * 100),
    yellow: Math.round((counts.YELLOW / total) * 100),
    blue: Math.round((counts.BLUE / total) * 100),
    orange: Math.round((counts.ORANGE / total) * 100)
  }

  const maxScore = Math.max(
    percentages.green,
    percentages.yellow,
    percentages.blue,
    percentages.orange
  )

  // 平分时按 GREEN > BLUE > YELLOW > ORANGE 优先级
  let primary = 'GREEN'
  if (percentages.green === maxScore) primary = 'GREEN'
  else if (percentages.blue === maxScore) primary = 'BLUE'
  else if (percentages.yellow === maxScore) primary = 'YELLOW'
  else if (percentages.orange === maxScore) primary = 'ORANGE'

  return { ...percentages, primary }
}

/**
 * 生成报告 ID
 */
function generateReportId() {
  const now = new Date()
  const yyyymmdd = '' + now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 900 + 100)
  return 'R' + yyyymmdd + rand
}

module.exports = { calculate4DScores, generateReportId }
