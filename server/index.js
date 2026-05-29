// 4D 领导力测评后端 API
// 用户注册 + 测评结果存储
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// 静态文件托管
app.use(express.static(path.join(__dirname, '..', 'public')))

// 内存存储（可替换为 SQLite 等持久化方案）
const users = []
const results = []
let nextId = 1

// ========== API ==========

// 注册/登录
app.post('/api/register', (req, res) => {
  const { name, phone, company, role } = req.body
  if (!name || !phone) {
    return res.status(400).json({ error: '姓名和手机号必填' })
  }
  let user = users.find(u => u.phone === phone)
  if (!user) {
    user = { id: nextId++, name, phone, company: company || '', role: role || '', createdAt: new Date().toISOString() }
    users.push(user)
  }
  res.json({ success: true, user })
})

// 保存测评结果
app.post('/api/results', (req, res) => {
  const { phone, scores, primaryType, reportId } = req.body
  if (!phone || !scores || !primaryType) {
    return res.status(400).json({ error: '缺少必要字段' })
  }
  const user = users.find(u => u.phone === phone)
  if (!user) return res.status(404).json({ error: '用户不存在，请先注册' })
  const record = { id: results.length + 1, userId: user.id, scores, primaryType, reportId, createdAt: new Date().toISOString() }
  results.push(record)
  res.json({ success: true, record })
})

// 查询用户的测评历史
app.get('/api/results', (req, res) => {
  const { phone } = req.query
  if (!phone) return res.status(400).json({ error: '请提供手机号' })
  const user = users.find(u => u.phone === phone)
  if (!user) return res.status(404).json({ error: '用户不存在' })
  const userResults = results.filter(r => r.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json({ success: true, user, results: userResults })
})

// Health check
app.get('/api/health', (req, res) => { res.json({ ok: true, ts: new Date().toISOString() }) })

// SPA fallback: 所有非 API 路由返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log('4D Server running on port ' + PORT) })
