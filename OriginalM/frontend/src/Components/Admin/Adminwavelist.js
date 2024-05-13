import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'; 

const Adminwavelist = () => {
    const [waves, setWaves] = useState([]);

    const fetchWaves = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3002/admin/wave-info');
            setWaves(response.data);
        } catch (error) {
            console.error('Error fetching waves:', error);
            // Handle error
        }
    };

    useEffect(() => {
        fetchWaves();
    }, []);

    return (
        <>
            <div className="left-side">
                <img src="../image/leftbar.png" alt="Admin Image" />
                <div className="links">
                    <Link to="/admindashboard">Dashboard</Link>
                    <Link to="/adminuserlist">Manage Userlist</Link>
                    <Link to="/adminwavelist">Wave list</Link>
                </div>
            </div>
            <div className="wave-info-container">
                <h2>Wave Information</h2>
                <table className="wave-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Message</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waves.map(wave => (
                            <tr key={wave.id}>
                                <td>{wave.name}</td>
                                <td>{wave.message}</td>
                                <td>{new Date(wave.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Adminwavelist;
