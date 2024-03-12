import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import HeroBanner from "./components/HeroBanner";
// import MissionVision from "./pages/MissionVision";
// import About from "./pages/About";
// import Quotes from "./pages/Quotes";
// import Courses from "./pages/Courses";
// import Feedback from "./pages/Feedback";
// import Speakers from "./pages/Speakers";
import Layout from "./components/Layout";
import Team from "./pages/Team";
import Donate from "./pages/Donate";
import Community from "./pages/Community";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Solutions from "./pages/Solutions";
import ForgotPassword from "./pages/ForgotPassword";
import CoursePage from "./pages/CoursePage";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/user/Profile";
import UserCourse from "./pages/user/UserCourse";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          <Route
            path="/team"
            element={
              <Layout>
                <Team />
              </Layout>
            }
          />
          <Route
            path="/donate"
            element={
              <Layout>
                <Donate />
              </Layout>
            }
          />
          <Route
            path="/community"
            element={
              <Layout>
                <Community />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/usercourse"
            element={
              <Layout>
                <UserCourse />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <CoursePage />
              </Layout>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
