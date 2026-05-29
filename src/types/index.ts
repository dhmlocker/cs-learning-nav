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
  stages: {
    name: string
    items: string[]
  }[]
}
