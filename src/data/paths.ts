import type { LearningPath } from '../types'

export const paths: LearningPath[] = [
  {
    id: 'lp1',
    title: '后端开发学习路径',
    description: '从零基础到合格后端开发工程师',
    targetJob: '后端开发工程师',
    tags: ['后端', 'Java', 'Go'],
    difficulty: '基础',
    stages: [
      { name: '编程基础', items: ['程序设计基础', '数据结构', '算法入门'] },
      { name: '核心课程', items: ['计算机网络', '操作系统', '数据库原理'] },
      { name: '工程实践', items: ['Git 版本控制', 'Docker 容器化', '项目实战'] },
    ],
    relatedCourses: ['c1', 'c2', 'c3', 'c4', 'c6', 'c9', 'c10'],
    relatedTools: ['t1', 't3', 't5'],
    relatedProjects: ['p2'],
    relatedJobs: ['j1'],
    interviewQuestions: [
      '进程和线程的区别？',
      'TCP 三次握手过程是怎样的？',
      '如何优化数据库查询性能？',
    ],
  },
  {
    id: 'lp2',
    title: 'AI 开发学习路径',
    description: '从 Python 入门到 AI 应用开发',
    targetJob: 'AI 应用开发工程师',
    tags: ['AI', 'Python', '深度学习'],
    difficulty: '进阶',
    stages: [
      { name: '数学基础', items: ['线性代数', '概率统计', '微积分'] },
      { name: '工具与框架', items: ['Python 编程', 'NumPy/Pandas', 'PyTorch'] },
      { name: '模型与应用', items: ['机器学习', '深度学习', 'NLP/CV 应用'] },
    ],
    relatedCourses: ['c5', 'c7', 'c8'],
    relatedTools: ['t4', 't11'],
    relatedProjects: ['p4'],
    relatedJobs: ['j5'],
    interviewQuestions: [
      '简述一个完整的机器学习项目流程',
      '如何处理数据不平衡的问题？',
      '特征工程有哪些常用方法？',
    ],
  },
  {
    id: 'lp3',
    title: '全栈开发学习路径',
    description: '前端 + 后端全栈能力培养',
    targetJob: '后端开发工程师',
    tags: ['全栈', 'React', 'Node.js'],
    difficulty: '基础',
    stages: [
      { name: '前端基础', items: ['HTML/CSS', 'JavaScript', 'React/Vue'] },
      { name: '后端基础', items: ['Node.js/Python', '数据库', 'API 设计'] },
      { name: '综合实战', items: ['全栈项目', '部署运维', '性能优化'] },
    ],
    relatedCourses: ['c2', 'c4', 'c9'],
    relatedTools: ['t1', 't2', 't5'],
    relatedProjects: ['p5'],
    relatedJobs: ['j1', 'j2'],
    interviewQuestions: [
      'React/Vue 的生命周期是怎样的？',
      '如何设计一个 RESTful API？',
    ],
  },
]
