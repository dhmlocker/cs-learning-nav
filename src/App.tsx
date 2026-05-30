import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Tools from './pages/Tools'
import ToolDetail from './pages/ToolDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Paths from './pages/Paths'
import PathDetail from './pages/PathDetail'
import Search from './pages/Search'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/paths/:id" element={<PathDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}
