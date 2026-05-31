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
  // 以下为可选学习内容字段，仅对已填充的课程展示
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
}
