import type { LearningPath } from '../types'

export const paths: LearningPath[] = [
  {
    id: 'lp1',
    title: '后端开发学习路径',
    description: '从零基础到合格后端开发工程师',
    targetJob: '后端开发工程师',
    stages: [
      { name: '编程基础', items: ['程序设计基础', '数据结构', '算法入门'] },
      { name: '核心课程', items: ['计算机网络', '操作系统', '数据库原理'] },
      { name: '工程实践', items: ['Git 版本控制', 'Docker 容器化', '项目实战'] },
    ],
  },
  {
    id: 'lp2',
    title: 'AI 开发学习路径',
    description: '从 Python 入门到 AI 应用开发',
    targetJob: 'AI 应用开发工程师',
    stages: [
      { name: '数学基础', items: ['线性代数', '概率统计', '微积分'] },
      { name: '工具与框架', items: ['Python 编程', 'NumPy/Pandas', 'PyTorch'] },
      { name: '模型与应用', items: ['机器学习', '深度学习', 'NLP/CV 应用'] },
    ],
  },
  {
    id: 'lp3',
    title: '全栈开发学习路径',
    description: '前端 + 后端全栈能力培养',
    targetJob: '前端/后端开发工程师',
    stages: [
      { name: '前端基础', items: ['HTML/CSS', 'JavaScript', 'React/Vue'] },
      { name: '后端基础', items: ['Node.js/Python', '数据库', 'API 设计'] },
      { name: '综合实战', items: ['全栈项目', '部署运维', '性能优化'] },
    ],
  },
]
