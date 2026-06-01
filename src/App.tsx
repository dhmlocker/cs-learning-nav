import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import CourseUnitDetail from './pages/CourseUnitDetail'
import Tools from './pages/Tools'
import ToolDetail from './pages/ToolDetail'
import ToolUseDetail from './pages/ToolUseDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import ProjectTaskDetail from './pages/ProjectTaskDetail'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import JobModuleDetail from './pages/JobModuleDetail'
import Paths from './pages/Paths'
import PathDetail from './pages/PathDetail'
import PathStageDetail from './pages/PathStageDetail'
import Search from './pages/Search'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:courseId/units/:unitId" element={<CourseUnitDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/tools/:toolId/uses/:useId" element={<ToolUseDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:projectId/tasks/:taskId" element={<ProjectTaskDetail />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/jobs/:jobId/modules/:moduleId" element={<JobModuleDetail />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/paths/:id" element={<PathDetail />} />
        <Route path="/paths/:pathId/stages/:stageId" element={<PathStageDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}
