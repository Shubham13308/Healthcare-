import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft } from "react-icons/fa6";
import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';
import { Header } from '../../Assets/UI/Header';
import { Link } from 'react-router-dom';
import profile from '../../Images/profile.png';


const Friends = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [forms, setForms] = useState([{ fullName: '', email: '', message: '' }]);
    const [friendIndexes, setFriendIndexes] = useState([1]);
    const [showForm, setShowForm] = useState(false);
    const [friendDetails, setfriendDetails] = useState([]);

    const fetchfriend = async () => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            return;
        }

        try {
            const response = await axios.get(
                "http://127.0.0.1:3002/users/get-friends",
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

        fetchfriend()
        fetchUserDetails();
    }, []);

    const initialValues = {
        fullName: '',
        email: '',
        message: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        fullName: Yup.string().required('fullName is required'),
        message: Yup.string().required('message is required'),



    });

    const handleSubmit = async (values) => {
        console.log("values", values);



        const token = localStorage.getItem("jwtToken");

        if (!token) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3002/users/friend', values, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },

            });
            console.log(response)
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert(response.data.success);
                window.location.reload();

            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Error submitting the form. Please try again later.');
        }
    };


    const handleAddMoreClick = () => {
        const newIndex = friendIndexes.length + 1;
        setForms([...forms, { fullName: '', email: '', message: '' }]);
        setFriendIndexes([...friendIndexes, newIndex]);
    };

    const handleshowForm = () => {
        setShowForm(true);
    };

    return (
        <div className='profile'>
            <div className='left_profile' style={{ height: '100%' }}>
                <Leftbar />
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <Form className='profile-form'>
                    <div className='right-profile'>
                        <Header image={userDetails?.image} name={userDetails?.firstname} lname={userDetails?.lastname} />
                        <div className='profile-hero'>
                            <div className='profile-head '>
                                <FaArrowLeft className='pro-arrow ml-3 ' />
                                <p className='pro-arrow-text '>Friends</p>
                            </div>
                            <p className='pro-arrow-texts'>Invite some friends name, show them your Waves and let's see what they can do!</p>
                            <div className='profile-main white pt-2'>
                                {showForm && forms.map((form, index) => (
                                    <div key={index} >
                                        <p className="frndNum">Friend #{friendIndexes[index]}</p>
                                        <div key={index} className="pro-username">
                                            <div className="pro-form-group">
                                                <label htmlFor="fullName ">Full Name</label>
                                                <div className="pro-input-div">
                                                    <Field type="text" id="fullName" name="fullName" className="pro-input" />
                                                </div>
                                                <ErrorMessage name="fullName" component="div" className='error' />
                                            </div>
                                            <div className="pro-form-group">
                                                <label htmlFor="email ">Email Address</label>
                                                <div className="pro-input-div">
                                                    <Field type="text" id="email" name="email" className="pro-input" />
                                                </div>
                                                <ErrorMessage name="email" component="div" className='error' />
                                            </div>
                                        </div>
                                        <div className="pro-form-group">
                                            <label htmlFor="message ">Message</label>
                                            <div className="pro-input-div">
                                                <Field type="text" id="message" name="message" className="pro-input w-full" />
                                            </div>
                                            <ErrorMessage name="message" component="div" className='error' />
                                        </div>
                                        <Link className="addMore" onClick={handleAddMoreClick}>+ Add More</Link>
                                        <div className='profile-btn'>
                                            <button type="submit" className="main-color btn mr-5" >UPDATE</button>
                                        </div>
                                    </div>

                                ))}

                                <div className={`${showForm ? 'hidden' : ''}`}>
                                    <div className="pro-username inviteFrnd">
                                        <div className="pro-form-group w-40">
                                            <Field
                                                type="text"
                                                id="searchField"
                                                name="searchField"
                                                placeholder="Search..."
                                                className="srch"
                                            />
                                        </div>
                                        <div className="pro-form-group">
                                            <div className=''>
                                                <button type="submit" className="main-color btn " onClick={handleshowForm}>Invite Friend</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex'>
                                        <div className='mr-2'>  {friendDetails.slice(0, 5).map((waveDetail, index) => (
                                            <div key={index} className='wavedesc'>
                                                <div className='d-flex'>
                                                    <img
                                                        src={profile}


                                                        alt="profile"
                                                        width='18%'
                                                        className='profile-img'
                                                    />
                                                    <div className='ml-3'>
                                                        <p className='goldenrod'>{waveDetail?.fullName} </p>
                                                        <p>{waveDetail?.email}</p>
                                                    </div>
                                                </div>
                                                <p className='waveStatus'>{waveDetail?.status}</p>
                                            </div>
                                        ))}</div>
                                        <div>  {friendDetails.slice(0, 5).map((waveDetail, index) => (
                                            <div key={index} className='wavedesc'>
                                                <div className='d-flex'>
                                                    <img
                                                        src={profile}
                                                        alt="profile"
                                                        width='18%'
                                                        className='profile-img'
                                                    />
                                                    <div className='ml-3'>
                                                        <p className='goldenrod'>{waveDetail?.fullName} </p>
                                                        <p>{waveDetail?.email}</p>
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

export default Friends;
