import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import axios from 'axios';

const AdminDashboard = () => {
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);

    const fetchUserCounts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3002/admin/userinfo');
            const { activeUsers, inactiveUsers, totalUsers } = response.data;
            setActiveUsersCount(activeUsers);
            setInactiveUsersCount(inactiveUsers);
            setTotalUsersCount(totalUsers);
        } catch (error) {
            console.error('Error fetching user counts:', error);
            // Handle error
        }
    };

    const fetchTotalMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3002/admin/total-messages');
            const { totalMessages } = response.data;
            setTotalMessages(totalMessages);
        } catch (error) {
            console.error('Error fetching total messages count:', error);
        }
    };

    useEffect(() => {
        fetchUserCounts();
        fetchTotalMessages();
    }, []);

    return (
        <div className="admin-dashboard">
            {/* Left side with image and links */}
            <div className="left-side">
                <img src=".././Images/leftbar.png" alt="Admin Image" />
                <div className="links">
                    <Link to="/admindashboard">Dashboard</Link>
                    <Link to="/adminuserlist">Manage Userlist</Link>
                    <Link to="/adminwavelist">Wave list</Link>
                </div>
            </div>

            {/* Right side with flexbox */}
            <div className="right-side">
                <div className="flexbox-container">
                    {/* Total users */}
                    <div className="flex-item">
                        <h3>Total Users</h3>
                        <p>{totalUsersCount}</p>
                    </div>

                    {/* Active users */}
                    <div className="flex-item">
                        <h3>Active Users</h3>
                        <p>{activeUsersCount}</p>
                    </div>

                    {/* Inactive users */}
                    <div className="flex-item">
                        <h3>Inactive Users</h3>
                        <p>{inactiveUsersCount}</p>
                    </div>

                    {/* Total waves */}
                    <div className="flex-item">
                        <h3>Total Messages</h3>
                        <p>{totalMessages}</p>
               
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminDashboard;
