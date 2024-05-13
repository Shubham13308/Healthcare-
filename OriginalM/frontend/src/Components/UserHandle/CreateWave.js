
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft } from "react-icons/fa6";
import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';


import profile from '../../Images/profile.png';
import { Header } from '../../Assets/UI/Header';

const CreateWave = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [waveDetails, setWaveDetails] = useState([]);
    const [searchField, setSearchField] = useState('');
    const fileRef = useRef(null);

    const initialValues = {
        image: '',
        message: '',



    };


    const validationSchema = Yup.object().shape({
        message: Yup.string().required('message is required'),
        image: Yup.string().required('image is required'),



    });

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
            // console.log("userdetails", response.data.image)
            setUserDetails(response.data);
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
                "http://127.0.0.1:3002/users/get-wave",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setWaveDetails(response.data);
            // console.log("wave", response.data)
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {

        fetchUserDetails();
        fetchwave();

    }, []);

    const handleSubmit = async (values) => {

        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('message', values.message);
        console.log(" wave", values)

        const token = localStorage.getItem("jwtToken");

        if (!token) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3002/users/wave', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert('Wave created successfully!');
                window.location.reload();

            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Error submitting the form. Please try again later.');
        }
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
                {({ values, setFieldValue }) => (
                    <Form className='profile-form'>
                        <div className='right-profile'>

                            <Header image={userDetails?.image} name={userDetails?.firstname} lname={userDetails?.lastname} />
                            <div className='profile-hero'>
                                <div className='profile-main '>
                                    <div className='profile-head'>
                                        <FaArrowLeft className='pro-arrow' />
                                        <p className='pro-arrow-text'>Create Waves</p>
                                    </div>
                                    <div className='pro-changePic'>
                                        <div className='pro-header'>
                                            <div className='pro-header-img'>
                                                <img
                                                    src={
                                                        waveDetails.length > 0
                                                            ? `http://127.0.0.1:3002/${waveDetails[waveDetails.length - 1].image}`
                                                            : profile
                                                    }
                                                    alt="profile"
                                                    width='100%'
                                                    className='profile-img'
                                                />
                                            </div>
                                            <div className='pro-greet-name d-flex aligncentre'>
                                                {userDetails ? (
                                                    <p className='pro-profile-name'>{userDetails.firstname} {userDetails.lastname}</p>
                                                ) : (
                                                    <p>Loading...</p> // or any other loading indicator
                                                )}
                                            </div>

                                        </div>
                                        <div>
                                            <input
                                                hidden
                                                ref={fileRef}
                                                type="file"
                                                onChange={(e) => setFieldValue('image', e.currentTarget.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='profile-main white'>
                                    <div className='detail-links mr-2'>
                                        <div className='wavePhoto'>
                                            <button type="button " className='wavePhotobtn' onClick={(e) => { e.preventDefault(); fileRef.current.click() }}>Upload Photos</button>
                                            <ErrorMessage name="image" component="div" className='error' />

                                            <Field type="text" id="message" name="message" placeholder="Write something ......." className="message " />
                                            <ErrorMessage name="message" component="div" className='error' />

                                            <div className='waveBtn'>
                                                <button type="submit" className="main-color btn mr-3">Create Wave</button>
                                            </div>
                                            <Field
                                                type="text"
                                                id="searchField"
                                                name="searchField"
                                                placeholder="Search..."
                                                className="srch"
                                                value={searchField}
                                                onChange={(e) => setSearchField(e.target.value)}

                                            />
                                            <ErrorMessage name="searchField" component="div" />

                                        </div>

                                        {waveDetails.slice(0, 6).map((waveDetail, index) => (
                                            <div key={index} className='wavedesc'>
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
                                                        <p className='goldenrod'>@{waveDetail.name}</p>
                                                        <p>{waveDetail?.message}</p>
                                                    </div>
                                                </div>
                                                <p className='waveStatus'>Active</p>
                                            </div>
                                        ))}



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
}

export default CreateWave;
