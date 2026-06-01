export type ResourceStatus = 'verified' | 'pending' | 'needs_review'

export interface CourseUnit {
  id: string
  title: string
  summary?: string
  goal?: string
  knowledgePoints: string[]
  relatedProjectTasks?: string[]
  relatedTools: string[]
  exercises?: string[]
  resources: TaskResource[]
  acceptanceCriteria: string[]
  sourceBasis?: string
  resourceStatus?: ResourceStatus
}

export interface ToolUsage {
  id: string
  title: string
  summary?: string
  problem?: string
  knowledgePoints: string[]
  relatedProjectTasks: string[]
  relatedCourses: string[]
  steps?: string[]
  resources: TaskResource[]
  acceptanceCriteria: string[]
  sourceBasis?: string
  resourceStatus?: ResourceStatus
}

export interface PathStageDetail {
  id: string
  title: string
  summary?: string
  goal?: string
  duration?: string
  courseIds: string[]
  projectIds: string[]
  toolIds: string[]
  knowledgePoints: string[]
  resources: TaskResource[]
  outcomes: string[]
  checklist: string[]
  sourceBasis?: string
  resourceStatus?: ResourceStatus
}

export interface SkillModule {
  id: string
  title: string
  summary?: string
  goal?: string
  skills: string[]
  relatedCourses: string[]
  relatedProjects: string[]
  resources: TaskResource[]
  interviewQuestions?: string[]
  portfolioAdvice?: string[]
  acceptanceCriteria: string[]
  sourceBasis?: string
  resourceStatus?: ResourceStatus
}

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
  units?: CourseUnit[]
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
  usageScenarios?: ToolUsage[]
}

export interface TaskResource {
  title: string
  source: string
  url: string
  type: 'doc' | 'tutorial' | 'exercise' | 'video' | 'repo'
  isRequired?: boolean
  note?: string
  status: 'verified' | 'pending' | 'needs_review'
}

export interface TaskStep {
  id: string
  title: string
  goal?: string
  deliverable: string
  knowledgePoints: string[]
  relatedCourses: string[]
  relatedExercises?: string[]
  relatedTools: string[]
  resources: TaskResource[]
  acceptanceCriteria: string[]
  commonMistakes?: string[]
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
  // 项目驱动学习字段
  finalOutcome?: string
  sourceBasis?: string
  resourceStatus?: 'verified' | 'pending' | 'needs_review'
  taskFlow?: TaskStep[]
  // 以下为旧版可选项目实战内容字段（无 taskFlow 的项目继续使用）
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
  skillModules?: SkillModule[]
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
  stageDetails?: PathStageDetail[]
}
