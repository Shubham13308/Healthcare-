import React from 'react'
import logo from '../../Images/logo.png' 
// import '../App.css';
import '../../App.css'
import { RxDashboard } from "react-icons/rx";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className='inner-leftbar'>
                <img src={logo} alt="logo" width='35%' />
                <div className='dash-links'>
                    <Link to="/dashboard" className='dash-link dashboard-link'><RxDashboard className='dash-icon' /><p className='dash-para'>Dashboard</p></Link>
                </div>
                <div className='dash-links'>
                    <Link to='/profile' className='dash-link'><FaChartLine className='dash-icon' /><p className='dash-para'>My Profile</p></Link>
                    <Link to="/preferences" className='dash-link'><FaChartLine className='dash-icon' /><p className='dash-para'>Prefrences</p></Link>
                    <Link to="/friends" className='dash-link'><FaChartLine className='dash-icon' /><p className='dash-para'>Friends</p></Link>
                    <Link to="/wave" className='dash-link'><FaChartLine className='dash-icon' /><p className='dash-para'>Create Waves</p></Link>
                    <Link to='/changePassword' className='dash-link'><FaChartLine className='dash-icon' /><p className='dash-para'>Change Password</p></Link>

                </div>
                <div className='dash-links logout-section'>
                    <Link to='/login' className='dash-link'><MdOutlineLogout className='dash-icon' /><p className='dash-para'>Log Out</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Leftbar