import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft } from "react-icons/fa6";
import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';
import chngePass from '../../Images/chngePass.png'


import { Header } from '../../Assets/UI/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
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

        fetchUserDetails();
    }, []);

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values) => {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3002/users/change-password', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success(response.data.success);
            }
            console.log(response)
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error('Old password does not match');
        }
    };

    return (
        <div className='profile'>
            <ToastContainer />
            <div className='left_profile' style={{ height: '100%' }}>
                <Leftbar />
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, setFieldValue }) => (
                    <Form className='profile-form'>
                        <div className='right-profile'>
                            <Header image={userDetails?.image} name={userDetails?.firstname} lname={userDetails?.lastname} />
                            <div className='profile-hero'>
                                <div className='profile-head '>
                                    <FaArrowLeft className='pro-arrow ml-3 ' />
                                    <p className='pro-arrow-text'>Change Password</p>
                                </div>
                                <div className='profile-main white d-flex pt-2'>
                                    <div className='changePassLeft'>
                                        <div className="pro-usernames pt-3">
                                            <div className="pro-form-groups">
                                                <label htmlFor="confirmPassword">Old Password</label>
                                                <div className="pro-input-div cPass">
                                                    <Field type={showPassword ? 'text' : 'password'} id="oldPassword" name="oldPassword" className="input cpassInput" />
                                                    <a type="button" onClick={() => setShowPassword(!showPassword)} className="eye-button">
                                                    </a>
                                                </div>
                                                <ErrorMessage name="oldPassword" component="div" className='error' />
                                            </div>
                                            <div className="pro-form-groups">
                                                <label htmlFor="newPassword">New Password</label>
                                                <div className="pro-input-div cPass">
                                                    <Field type={showPassword ? 'text' : 'password'} id="newPassword" name="newPassword" className="input cpassInput" />
                                                    <a type="button" onClick={() => setShowPassword(!showPassword)} className="eye-button">
                                                    </a>
                                                </div>
                                                <ErrorMessage name="newPassword" component="div" className='error' />
                                            </div>
                                            <div className="pro-form-groups">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="pro-input-div cPass">
                                                    <Field type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" className="input cpassInput" />
                                                    <a type="button" onClick={() => setShowPassword(!showPassword)} className="eye-button">
                                                    </a>
                                                </div>
                                                <ErrorMessage name="confirmPassword" component="div" className='error' />
                                            </div>
                                        </div>
                                        <div className='profile-btn'>
                                            <button type="submit" className="main-color btn mr-5">UPDATE</button>
                                        </div>
                                    </div>
                                    <div className='changePassRyt'>
                                        <img src={chngePass} alt="Change Password" />
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;
