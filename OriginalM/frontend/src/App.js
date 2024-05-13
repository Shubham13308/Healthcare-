import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPages from './Pages/./UserHandle/SignuPages'
import LoginPages from "./Pages/UserHandle/LoginPages";
import ProfilePages from './Pages/UserController/ProfilePage';
import ChangePasswordPages from './Pages/UserController/ChangePasswordPages';
import PreferencePages from './Pages/UserController/PreferencePages'
import DashboardPages from './Pages/UserHandle/DashboardPages';
import CreateWavePages from './Pages/UserHandle/CreateWavePages';
import FriendsPages from './Pages/UserHandle/FriendsPages';
import AdminLoginPages from './Pages/Admin/AdminLoginPages';
import AdminRegisterPages from './Pages/Admin/AdminRegisterPages';
import AdminUserListPages from './Pages/Admin/AdminUserListPages';
import AdminwavelistPages from './Pages/Admin/AdminwavelistPages';
import AdminDashboardPages from './Pages/Admin/Admin-DashboardPages';
import PrivateRoute from './Assets/Authentication/PrivateRoute';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element=<SignupPages/> />
        <Route path="/" element={<LoginPages />} />
        <Route path='/adminlogin' element = <AdminLoginPages/>/>
        <Route path='/adminregister' element = <AdminRegisterPages/> />
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element =  <ProfilePages/>/>
        <Route path="/changePassword" element =  <ChangePasswordPages/>/>
        <Route path="/preferences" element =  <PreferencePages/>/>
        <Route path="/dashboard" element =  <DashboardPages/>/>
        <Route path='/wave' element = <CreateWavePages/>/>
        <Route path='/friends' element = <FriendsPages/>/>
        <Route path='/admindashboard' element = <AdminDashboardPages/> />
        <Route path='/adminuserlist' element = <AdminUserListPages/> />
        <Route path='/adminwavelist' element = <AdminwavelistPages/> />

          
        </Route>
        
        
       </Routes>
    </Router>
  );
};

export default App;
