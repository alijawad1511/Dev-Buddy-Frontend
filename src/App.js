import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import DevelopersPage from './pages/DevelopersPage';
import MyProjectsPage from './pages/MyProjectsPage';
import HomePage from './pages/HomePage';
import JoinedProjects from './components/projects/JoinedProjects';
import JoinedProjectsPage from './pages/JoinedProjectsPage';
import MyProjects from './components/projects/MyProjects';
import JoinedProjectDashboard from './components/dashboard/JoinedProjectDashboard';
import ProjectDetail from './components/projects/ProjectDetail';
import AssignedTasks from './components/tasks/projectParticipant/AssignedTasks';
import AdminApprovals from './components/tasks/AdminApprovals';
import CompletedTasks from './components/tasks/CompletedTasks';
import Chatroom from './components/chatroom/Chatroom';
import ProjectTeam from './components/projects/ProjectTeam';
import RequestsPage from './pages/RequestsPage';
import UserTimeline from './components/UserTimeline';
import MyProfilePage from './pages/MyProfilePage';
import MyProfile from './components/profile/MyProfile';
import Requests from './components/requests/Requests';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Developers from './components/developers/Developers';
import ReviewPage from './pages/ReviewPage';
import MyReviews from './components/reviews/MyReviews';
import CreateProject from './components/projects/CreateProject';
import ProjectAdminDashboard from './components/dashboard/ProjectAdminDashboard';
import ManageParticipants from './components/projects/myProjects/ManageParticipants';
import DeveloperProfile from './components/developers/DeveloperProfile';
import ForgotPasswordPage from './pages/forgotPassword/ForgotPasswordPage';
import { UserProvider } from './contexts/UserContext';
import TaskTracking from './components/tasks/projectAdmin/TaskTracking';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProjectProvider } from './contexts/ProjectContext';
import ManageApprovals from './components/tasks/projectAdmin/ManageApprovals';


function App() {

  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='signup' element={<SignUpPage />} />
              <Route path='forgot-password' element={<ForgotPasswordPage />} />
              <Route path='reset-password/:id/:token' element={<ResetPasswordPage />} />
              <Route path='timeline' element={<HomePage />}>
                <Route path='' element={<UserTimeline />} />
                <Route path='project/detail' element={<ProjectDetail />} />
              </Route>
              <Route path='my-projects' element={<MyProjectsPage />}>
                <Route path='' element={<MyProjects />} />
                <Route path='create-project' element={<CreateProject />} />
                <Route path='manage-project'>
                  <Route path='' element={<ProjectAdminDashboard />} />
                  <Route path='project-detail' element={<ProjectDetail />} />
                  <Route path='manage-participants' element={<ManageParticipants />} />
                  <Route path='chatroom' element={<Chatroom />} />
                  <Route path='task-tracking' element={<TaskTracking />} />
                  <Route path='manage-approvals' element={<ManageApprovals />} />
                </Route>
              </Route>
              <Route path='joined-projects' element={<JoinedProjectsPage />}>
                <Route path='' element={<JoinedProjects />} />
                <Route path='joined-dashboard' >
                  <Route path='' element={<JoinedProjectDashboard />} />
                  <Route path='project-detail' element={<ProjectDetail />} />
                  <Route path='project-team' element={<ProjectTeam />} />
                  <Route path='chatroom' element={<Chatroom />} />
                  <Route path='assigned-tasks' element={<AssignedTasks />} />
                  <Route path='admin-approvals' element={<AdminApprovals />} />
                  <Route path='completed-tasks' element={<CompletedTasks />} />
                </Route>
              </Route>
              <Route path='developers' element={<DevelopersPage />} >
                <Route path='' element={<Developers />} />
                <Route path='profile' element={<DeveloperProfile />} />
              </Route>
              <Route path='requests' element={<RequestsPage />}>
                <Route path='' element={<Requests />} />
              </Route>
              <Route path='reviews' element={<ReviewPage />}>
                <Route path='' element={<MyReviews />} />
              </Route>
              <Route path='my-profile' element={<MyProfilePage />}>
                <Route path='' element={<MyProfile />} />
              </Route>
            </Routes>
          </Router>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default App;
