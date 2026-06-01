export interface ExternalResource {
  source: string
  title: string
  url: string
  type: 'course' | 'tutorial' | 'exercise' | 'project' | 'reference' | 'tool'
  stage?: string
  difficulty?: '入门' | '基础' | '进阶' | '高级'
  isRequired?: boolean
  note?: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: '入门' | '基础' | '进阶' | '高级'
  relatedTools: string[]
  relatedProjects: string[]
  relatedJobs: string[]
  interviewQuestions?: string[]
  // 简短导读（替代原有大段 AI 章节）
  overview?: string
  learningObjectives?: string[]
  prerequisites?: string[]
  chapters?: {
    title: string
    summary: string
    keyPoints: string[]
    exercises?: string[]
  }[]
  practiceTasks?: string[]
  recommendedResources?: {
    title: string
    type: '书籍' | '视频' | '文章' | '工具'
  }[]
  externalResources?: ExternalResource[]
  learningTips?: string[]
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  difficulty: '入门' | '基础' | '进阶' | '高级'
  relatedCourses: string[]
  faq?: string[]
  // 以下为可选工具手册内容字段
  useCases?: string[]
  setupSteps?: string[]
  commonCommands?: { command: string; description: string }[]
  workflowTips?: string[]
  commonProblems?: { problem: string; solution: string }[]
  relatedScenarios?: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: '入门' | '基础' | '进阶' | '高级'
  relatedCourses: string[]
  relatedTools: string[]
  relatedJobs: string[]
  highlights?: string[]
  extensions?: string[]
  interviewTalkingPoints?: string
  // 以下为可选项目实战内容字段
  projectGoals?: string[]
  targetUsers?: string[]
  prerequisites?: string[]
  featureModules?: {
    title: string
    description: string
    tasks: string[]
  }[]
  developmentSteps?: {
    title: string
    description: string
    checklist: string[]
  }[]
  acceptanceCriteria?: string[]
  interviewFollowups?: string[]
}

export interface Job {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  relatedCourses: string[]
  relatedTools: string[]
  relatedProjects?: string[]
  skills?: string[]
  tasks?: string[]
  interviewQuestions?: string[]
  // 以下为可选求职准备内容字段
  requiredAbilities?: string[]
  learningPlan?: { phase: string; focus: string; duration: string }[]
  portfolioAdvice?: string[]
  interviewFocus?: string[]
  growthPath?: string[]
  commonMistakes?: string[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  targetJob: string
  tags?: string[]
  difficulty?: '入门' | '基础' | '进阶' | '高级'
  stages: {
    name: string
    items: string[]
  }[]
  relatedCourses?: string[]
  relatedTools?: string[]
  relatedProjects?: string[]
  relatedJobs?: string[]
  interviewQuestions?: string[]
  // 以下为可选任务化学习内容字段
  learningStages?: {
    name: string
    duration?: string
    description: string
    courseIds: string[]
    projectIds: string[]
    toolIds: string[]
    goals: string[]
    checklist: string[]
    externalResources?: ExternalResource[]
  }[]
  finalOutcomes?: string[]
  portfolioProjects?: { title: string; description: string; techStack: string[] }[]
  jobReadiness?: string[]
}
