// 认证模块 —— 用户注册、登录、档案管理
// 基于本地持久化存储，后续可升级为云开发数据库

const USER_KEY = '4d_user_profile'
const USER_LIST_KEY = '4d_user_list'

/**
 * 获取当前用户信息
 * @returns {Object|null}
 */
function getUser() {
  try {
    const raw = wx.getStorageSync(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

/**
 * 是否已登录（已注册）
 * @returns {boolean}
 */
function isLoggedIn() {
  return !!getUser()
}

/**
 * 注册新用户
 * @param {Object} info - { name, phone, company, role }
 * @returns {Promise<Object>} 用户信息
 */
function register(info) {
  return new Promise((resolve, reject) => {
    // 基础校验
    if (!info.name || !info.name.trim()) {
      reject(new Error('请输入您的姓名'))
      return
    }
    if (!info.phone || !/^1[3-9]\d{9}$/.test(info.phone.trim())) {
      reject(new Error('请输入正确的手机号码'))
      return
    }

    wx.login({
      success: (loginRes) => {
        // 用户档案
        const profile = {
          id: generateId(),
          name: info.name.trim(),
          phone: info.phone.trim(),
          company: (info.company || '').trim(),
          role: (info.role || '').trim(),
          code: loginRes.code,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        // 保存当前用户
        wx.setStorageSync(USER_KEY, JSON.stringify(profile))

        // 追加到全局用户列表
        addToUserList(profile)

        resolve(profile)
      },
      fail: (err) => {
        // 即使 wx.login 失败也不阻塞注册
        const profile = {
          id: generateId(),
          name: info.name.trim(),
          phone: info.phone.trim(),
          company: (info.company || '').trim(),
          role: (info.role || '').trim(),
          code: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        wx.setStorageSync(USER_KEY, JSON.stringify(profile))
        addToUserList(profile)

        resolve(profile)
      }
    })
  })
}

/**
 * 更新用户信息
 * @param {Object} updates
 */
function updateUser(updates) {
  const user = getUser()
  if (!user) return

  const updated = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  wx.setStorageSync(USER_KEY, JSON.stringify(updated))

  // 同步更新用户列表
  const list = getAllUsers().map(u => u.id === user.id ? { ...u, ...updates } : u)
  wx.setStorageSync(USER_LIST_KEY, JSON.stringify(list))

  return updated
}

/**
 * 退出登录
 */
function logout() {
  wx.removeStorageSync(USER_KEY)
}

/**
 * 获取所有注册用户列表
 * @returns {Array}
 */
function getAllUsers() {
  try {
    const raw = wx.getStorageSync(USER_LIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

/**
 * 将用户添加到用户列表（去重）
 * @param {Object} profile
 */
function addToUserList(profile) {
  const list = getAllUsers()
  const exists = list.find(u => u.id === profile.id || u.phone === profile.phone)
  if (exists) {
    // 更新已有记录
    const idx = list.indexOf(exists)
    list[idx] = { ...exists, ...profile }
  } else {
    list.unshift(profile)
  }
  wx.setStorageSync(USER_LIST_KEY, JSON.stringify(list))
}

/**
 * 生成唯一 ID
 */
function generateId() {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).substring(2, 8)
  return `u_${ts}_${rand}`
}

module.exports = {
  getUser,
  isLoggedIn,
  register,
  updateUser,
  logout,
  getAllUsers
}
