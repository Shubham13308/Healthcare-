
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';
import { Header } from '../../Assets/UI/Header';
import { Link } from 'react-router-dom';
import profile from '../../Images/profile.png';


const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [waveDetails, setWaveDetails] = useState([]);
  const [friendDetails, setfriendDetails] = useState([]);

  const fetchfriend = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3002/users/get-activefriends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfriendDetails(response.data);
      console.log("wave", response.data)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const fetchwave = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3002/users/get-allwave",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWaveDetails(response.data);
      console.log("wave", response.data)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const fetchUserDetails = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3002/users/user-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {

    fetchwave()
    fetchUserDetails();
    fetchfriend()
  }, []);
return (
    < div className='profile'>
      <div className='left_profile' style={{ height: '100%' }}>
        <Leftbar />
      </div>
      <Formik>
        <Form className='profile-form'>
          <div className='right-profile'>
            <Header image={userDetails?.image} name={userDetails?.firstname} lname={userDetails?.lastname} />
            <div className='profile-hero mt-2'>
              <div className='profile-main white  '>

                <div>
                  <div className='profile-head '>
                    <p className='pro-arrow-text ml-3'>Making Waves</p>
                  </div>
                  <div className='d-flex'>
                    <Link to="/modalwave" >
                      <div className='d-flex'>
                        <div>
                          {waveDetails.slice(0, 2).map((waveDetail, index) => (
                            <div key={index} className='wavedesc color-white'>
                              <div className='d-flex'>

                                <img
                                  src={
                                    waveDetail?.image
                                      ? `http://127.0.0.1:3002/${waveDetail.image}`
                                      : profile
                                  }
                                  alt="profile"
                                  width='18%'
                                  className='profile-img'
                                />

                                <div className='ml-3'>
                                  <p className='goldenrod'>@{waveDetail?.name}</p>
                                  <p>{waveDetail?.message}</p>
                                  <Link className='goldenrod'>Follow</Link>
                                </div>
                              </div>

                            </div>

                          ))}
                        </div>

                        <div class="vl"></div>
                      </div>
                    </Link>

                    <div className='d-flex'>
                      <div>
                        {waveDetails.slice(3, 5).map((waveDetail, index) => (
                          <div key={index} className='wavedesc color-white'>
                            <div className='d-flex'>
                              <img
                                src={
                                  waveDetail?.image
                                    ? `http://127.0.0.1:3002/${waveDetail.image}`
                                    : profile
                                }
                                alt="profile"
                                width='18%'
                                className='profile-img'
                              />
                              <div className='ml-3'>
                                <p className='goldenrod'>@{waveDetail?.name}</p>
                                <p>{waveDetail?.message}</p>
                                <Link className='goldenrod'>Follow</Link>
                              </div>
                            </div>
                          </div>

                        ))}
                      </div>

                      <div class="vl"></div>
                    </div>
                    <div>
                      {waveDetails.slice(6, 8).map((waveDetail, index) => (
                        <div key={index} className='wavedesc color-white'>
                          <div className='d-flex'>
                            <img
                              src={
                                waveDetail?.image
                                  ? `http://127.0.0.1:3002/${waveDetail.image}`
                                  : profile
                              }
                              alt="profile"
                              width='18%'
                              className='profile-img'
                            />
                            <div className='ml-3'>
                              <p className='goldenrod'>@{waveDetail?.name} </p>
                              <p>{waveDetail?.message}</p>
                              <Link className='goldenrod'>Follow</Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='profile-hero mt-2'>
              <div className='profile-main white '>

                <div >
                  <div className='profile-head '>
                    <p className='pro-arrow-text ml-3'>Friends</p>
                  </div>
                  <div className='d-flex'>
                    <div className='mr-2'>  {friendDetails.slice(0, 2).map((waveDetail, index) => (
                      <div key={index} className='wavedesc'>
                        <div className='d-flex'>
                          <img
                            src={profile}


                            alt="profile"
                            width='18%'
                            className='profile-img'
                          />
                          <div className='ml-3'>
                            <p className='frndtext'>{waveDetail?.fullName} </p>
                            <p>{waveDetail?.email}</p>
                          </div>
                        </div>
                        <p className='waveStatus'>{waveDetail?.status}</p>
                      </div>
                    ))}</div>
                    <div>  {friendDetails.slice(3, 5).map((waveDetail, index) => (
                      <div key={index} className='wavedesc'>
                        <div className='d-flex'>
                          <img
                            src={profile}
                            alt="profile"
                            width='18%'
                            className='profile-img'
                          />
                          <div className='ml-3'>
                            <p className='frndtext'>{waveDetail?.fullName} </p>
                            <p className='main-colo-text'>{waveDetail?.email}</p>
                          </div>
                        </div>
                        <p className='waveStatus'>{waveDetail?.status}</p>
                      </div>
                    ))}</div>
                  </div>


                </div>

              </div>
            </div>

            <Footer />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Dashboard;
