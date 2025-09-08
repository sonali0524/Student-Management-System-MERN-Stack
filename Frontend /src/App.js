import "./App.css";
import AddStudent from "./Pages/AddStudent";
import { Route, Routes } from "react-router-dom"; // No need to import Router here
import Home from "./Pages/Home/newhome";
import List from "./Pages/Home/list";
import ShowOne from "./Components/ShowOne";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import Login from './Pages/Login/Login';  // Corrected path
import Signup from './Pages/Signup/Signup';  // Corrected path
import TeacherDashboard from "./Pages/dashboard/teacher";
import AnnouncementSection from "./Components/AnnouncementSection";  // Import the new AnnouncementSection
import StudentDashboard from "./Pages/dashboard/student";
import CommonHome from "./Pages/Home/commonhome";
import ResetPassword from "./Pages/ResetPassword";
import StudentInfo from "./Pages/ViewMyProfile";
import ContactPage from "./Pages/ContactPage";
// const logger = require('./logger/logger.js');
function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes> {/* Removed Router here */}
        <Route path="/" exact element={<Home />} />
        <Route path="/list" exact element={<List />} />
        <Route path="*" exact element={<NotFound />} />
        <Route path="/add-student" exact element={<AddStudent />} />
        <Route path="/get/:id" exact element={<ShowOne />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/showone" exact element={<ShowOne/>} />
        <Route path="/announcements" exact element={<AnnouncementSection />} />  {/* New route for announcements */}
       <Route path="/dashboard/teacher" exact element={<TeacherDashboard/>}/>
       <Route path="/dashboard/student" exact element={<StudentDashboard/>}/>
       <Route path="/commonhome" exact element={<CommonHome/>}/>
       <Route path="/resetpassword" exact element={<ResetPassword/>}/>
       <Route path="/studentinfo" exact element={<StudentInfo/>}/>
       <Route path="/contactpage" exact element={<ContactPage/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
