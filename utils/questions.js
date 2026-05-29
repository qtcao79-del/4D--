// 24 道强迫选择题 —— 查理·佩勒林博士 4D 领导力系统
// 每道题从四个选项中选一个最贴近自己的
// GREEN 培养型 | YELLOW 包容型 | BLUE 展望型 | ORANGE 指导型

const QUESTIONS = [
  {
    id: 1,
    scenario: '团队周一早会，你最关心的是：',
    options: [
      { text: '大家这周的情绪状态和动力如何', type: 'GREEN' },
      { text: '团队气氛是否融洽，有没有人被边缘化', type: 'YELLOW' },
      { text: '本周战略方向和长期目标对齐了吗', type: 'BLUE' },
      { text: '本周交付节点和具体责任人是谁', type: 'ORANGE' }
    ]
  },
  {
    id: 2,
    scenario: '下属把项目搞砸了，你的第一反应是：',
    options: [
      { text: '先关心 Ta 的情绪，问「你还好吗」', type: 'GREEN' },
      { text: '召集大家一起想办法，别让 Ta 孤立无援', type: 'YELLOW' },
      { text: '复盘根因，找出系统性的逻辑漏洞', type: 'BLUE' },
      { text: '立刻止损，明确接下来的 Deadline 和动作', type: 'ORANGE' }
    ]
  },
  {
    id: 3,
    scenario: '开会时陷入争论，你最受不了的是：',
    options: [
      { text: '有人冷血地否定别人的真诚付出', type: 'GREEN' },
      { text: '气氛剑拔弩张、要散伙的感觉', type: 'YELLOW' },
      { text: '讨论缺乏逻辑、全凭情绪和拍脑袋', type: 'BLUE' },
      { text: '没有结论、没有 Action、白白浪费时间', type: 'ORANGE' }
    ]
  },
  {
    id: 4,
    scenario: '你写微信 / 邮件的风格更接近：',
    options: [
      { text: '温暖、走心，会加表情包关心对方', type: 'GREEN' },
      { text: '客气、礼貌，照顾每个人的感受', type: 'YELLOW' },
      { text: '结构化、有逻辑层次，论点清晰', type: 'BLUE' },
      { text: '短、平、快，直接说结论和要求', type: 'ORANGE' }
    ]
  },
  {
    id: 5,
    scenario: '面对一份新工作，你最先评估的是：',
    options: [
      { text: '这份工作能不能成就别人、有意义吗', type: 'GREEN' },
      { text: '团队氛围如何，同事好不好相处', type: 'YELLOW' },
      { text: '这件事的天花板和长期想象空间', type: 'BLUE' },
      { text: '薪资、KPI、晋升路径是否清晰', type: 'ORANGE' }
    ]
  },
  {
    id: 6,
    scenario: '压力山大时，你最容易做的事是：',
    options: [
      { text: '为了不伤和气，委屈自己默默扛', type: 'GREEN' },
      { text: '和稀泥折中，谁也不得罪', type: 'YELLOW' },
      { text: '变得毒舌、独裁，觉得别人都跟不上', type: 'BLUE' },
      { text: '微观管理，死死盯着每一个细节', type: 'ORANGE' }
    ]
  },
  {
    id: 7,
    scenario: '下属来汇报工作，你最希望听到：',
    options: [
      { text: 'Ta 在这件事上的真实感受和成长', type: 'GREEN' },
      { text: '团队协作过程中的温馨小故事', type: 'YELLOW' },
      { text: '数据、因果、底层逻辑的推演', type: 'BLUE' },
      { text: '结果、达成率、下一步 Action', type: 'ORANGE' }
    ]
  },
  {
    id: 8,
    scenario: '你最讨厌的同事类型是：',
    options: [
      { text: '冷血无情、只看 KPI 不看人的', type: 'GREEN' },
      { text: '搞小圈子、拉帮结派的', type: 'YELLOW' },
      { text: '因循守旧、拒绝任何改变的', type: 'BLUE' },
      { text: '光说不练、永远拖延交付的', type: 'ORANGE' }
    ]
  },
  {
    id: 9,
    scenario: '团建你最想组织的活动是：',
    options: [
      { text: '深度对话工作坊，大家敞开心扉', type: 'GREEN' },
      { text: '家庭式聚餐，所有人都参与', type: 'YELLOW' },
      { text: '战略沙盘推演，头脑风暴未来三年', type: 'BLUE' },
      { text: '竞技比赛，有排名有奖金', type: 'ORANGE' }
    ]
  },
  {
    id: 10,
    scenario: '做决策时，你最依赖的是：',
    options: [
      { text: '我的初心和价值观', type: 'GREEN' },
      { text: '过往经验和团队共识', type: 'YELLOW' },
      { text: '数据模型和因果推演', type: 'BLUE' },
      { text: 'ROI 和可量化的成功指标', type: 'ORANGE' }
    ]
  },
  {
    id: 11,
    scenario: '你最常挂在嘴边的话是：',
    options: [
      { text: '「你觉得呢？我想听听你的感受。」', type: 'GREEN' },
      { text: '「大家都是一家人，别伤了和气。」', type: 'YELLOW' },
      { text: '「这背后的底层逻辑是什么？」', type: 'BLUE' },
      { text: '「别讲理由，我只要结果。」', type: 'ORANGE' }
    ]
  },
  {
    id: 12,
    scenario: '别人请你帮忙，你的本能反应：',
    options: [
      { text: '好啊好啊，能帮就帮，不忍心拒绝', type: 'GREEN' },
      { text: '看看大家什么意见，我都行', type: 'YELLOW' },
      { text: '先问清楚为什么要做、目标是什么', type: 'BLUE' },
      { text: '直接问要什么、什么时候要', type: 'ORANGE' }
    ]
  },
  {
    id: 13,
    scenario: '理想中的领导画像是：',
    options: [
      { text: '像导师一样温暖、托举每一个人', type: 'GREEN' },
      { text: '像大家长一样，让所有人有归属感', type: 'YELLOW' },
      { text: '像战略家一样，带大家看清未来', type: 'BLUE' },
      { text: '像将军一样，雷厉风行带队打胜仗', type: 'ORANGE' }
    ]
  },
  {
    id: 14,
    scenario: '看到新员工不适应，你会：',
    options: [
      { text: '私下找 Ta 谈心，了解 Ta 的真实困扰', type: 'GREEN' },
      { text: '主动带 Ta 吃饭、融入集体', type: 'YELLOW' },
      { text: '帮 Ta 梳理岗位的核心逻辑和方法论', type: 'BLUE' },
      { text: '给 Ta 清晰的 SOP 和考核标准', type: 'ORANGE' }
    ]
  },
  {
    id: 15,
    scenario: '公司要变革，你的立场更接近：',
    options: [
      { text: '担心员工被牺牲，先想怎么保护人', type: 'GREEN' },
      { text: '希望平稳过渡，不要撕裂团队', type: 'YELLOW' },
      { text: '强烈支持，旧模式早该被颠覆了', type: 'BLUE' },
      { text: '看 KPI，只要能更高效就推', type: 'ORANGE' }
    ]
  },
  {
    id: 16,
    scenario: '一天结束，让你最有成就感的是：',
    options: [
      { text: '今天真诚帮到了某个人', type: 'GREEN' },
      { text: '团队氛围比昨天更和谐了', type: 'YELLOW' },
      { text: '想清楚了一个困扰已久的难题', type: 'BLUE' },
      { text: '把今天的 Todo 全部勾完了', type: 'ORANGE' }
    ]
  },
  {
    id: 17,
    scenario: '客户突然临时变更需求，你的第一反应：',
    options: [
      { text: '先安抚客户情绪，理解 Ta 的真实顾虑', type: 'GREEN' },
      { text: '召集相关同事一起讨论怎么平稳应对', type: 'YELLOW' },
      { text: '复盘需求逻辑，看变更背后有没有更优解', type: 'BLUE' },
      { text: '评估工时和成本，立刻给出新报价和节点', type: 'ORANGE' }
    ]
  },
  {
    id: 18,
    scenario: '周末加班，你最能接受的理由是：',
    options: [
      { text: '团队里有人扛不住，我得去搭把手', type: 'GREEN' },
      { text: '大家都在拼，我不想掉队', type: 'YELLOW' },
      { text: '这事儿能让我搞懂一个新领域', type: 'BLUE' },
      { text: '做完就能拿到那块奖金 / 那个晋升', type: 'ORANGE' }
    ]
  },
  {
    id: 19,
    scenario: '给团队做分享，你最在意：',
    options: [
      { text: '每个人有没有被启发、被看见', type: 'GREEN' },
      { text: '现场互动好不好、氛围 high 不 high', type: 'YELLOW' },
      { text: '内容深度够不够、有没有信息增量', type: 'BLUE' },
      { text: '听完大家能不能马上落地行动', type: 'ORANGE' }
    ]
  },
  {
    id: 20,
    scenario: '面对一个明显跑偏的项目，你会：',
    options: [
      { text: '先了解团队成员卡在哪里、有什么委屈', type: 'GREEN' },
      { text: '开一个圆桌，让所有人把话讲开', type: 'YELLOW' },
      { text: '回到原点，重新审视目标和路径', type: 'BLUE' },
      { text: '立刻砍掉冗余，锁定关键路径强推', type: 'ORANGE' }
    ]
  },
  {
    id: 21,
    scenario: '招聘新人，你最看重：',
    options: [
      { text: 'Ta 是不是有同理心、有温度的人', type: 'GREEN' },
      { text: 'Ta 能不能融入我们的团队文化', type: 'YELLOW' },
      { text: 'Ta 的认知深度和学习潜力', type: 'BLUE' },
      { text: 'Ta 过往的业绩和交付能力', type: 'ORANGE' }
    ]
  },
  {
    id: 22,
    scenario: '朋友找你倾诉烦恼，你的反应通常是：',
    options: [
      { text: '安静地听，共情 Ta 的感受', type: 'GREEN' },
      { text: '约 Ta 出来吃顿饭，边吃边聊', type: 'YELLOW' },
      { text: '帮 Ta 分析问题的本质和选项', type: 'BLUE' },
      { text: '直接给 Ta 建议：你应该这么做', type: 'ORANGE' }
    ]
  },
  {
    id: 23,
    scenario: '开年规划，你最先思考的是：',
    options: [
      { text: '今年要让团队的每个人都有成长', type: 'GREEN' },
      { text: '今年怎么把团队的关系拧得更紧', type: 'YELLOW' },
      { text: '今年我们要在战略上做出什么突破', type: 'BLUE' },
      { text: '今年的营收和核心 KPI 数字是多少', type: 'ORANGE' }
    ]
  },
  {
    id: 24,
    scenario: '让你彻底崩溃的工作场景是：',
    options: [
      { text: '努力付出却被人误解、被人辜负', type: 'GREEN' },
      { text: '团队内讧、有人公开撕破脸', type: 'YELLOW' },
      { text: '被迫做一件毫无逻辑、纯属内耗的事', type: 'BLUE' },
      { text: '事情失控、节点延期、目标没达成', type: 'ORANGE' }
    ]
  }
]

module.exports = { QUESTIONS }
