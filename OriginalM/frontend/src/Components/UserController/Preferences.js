import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';

import { Header } from '../../Assets/UI/Header';

const Preferences = () => {
    const languagesStatusOptions = [
        'English',
        'Hindi',
        'punjabi',

    ];

    const [userDetails, setUserDetails] = useState(null);
    const [preferenceDetails, setPreferenceDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                return;
            }

            try {
                const response = await axios.get(
                    "http://127.0.0.1:3004/users/user-details",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserDetails(response.data);
            } catch (error) {
                toast.error("Error fetching user details:", error);
            }
        };

        const fetchPreference = async () => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                return;
            }

            try {
                const response = await axios.get(
                    "http://127.0.0.1:3004/users/get-preferences",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPreferenceDetails(response.data);
                console.log(response)
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }

        fetchUserDetails();
        fetchPreference();
    }, []);
    const initialValues = {
        languages: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        waketime: '',
        bedtime: '',
        height: '',
        weight: '',
        bloodGlucose: '',
        bloodPressure: '',
        Cholestrol: '',
        distance: '',
        communication: '',

    };

    const validationSchema = Yup.object().shape({



    });


    const handleSubmit = async (values) => {
        console.log("values", values)



        const token = localStorage.getItem("jwtToken");

        if (!token) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3004/users/preferences', values, {
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
            toast.error('Error:', error.response || error.message || error);
            
        }
    };
    return (
        <div className='profile'>
       
            <div className='left_profile' style={{ height: '100%' }}>
                <Leftbar />
            </div>

            <Formik
                initialValues={preferenceDetails ? preferenceDetails : initialValues}
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
                                <p className='pro-arrow-text '>Preferences</p>
                            </div>
                            <div className='profile-main white  pt-2'>

                                <div className="pro-username">
                                    <div className="pro-form-group">
                                        <label htmlFor="languages ">languages</label>
                                        <div className="pro-input-div">
                                            <Field as="select" id="languages" name="languages" className="pro-input">
                                                <option value="" label="Select languages" />
                                                {languagesStatusOptions.map((status) => (
                                                    <option key={status} value={status} label={status} />
                                                ))}
                                            </Field>
                                        </div>
                                        <ErrorMessage name="gender" component="div" className='error' />
                                    </div>
                                    <div className="pro-form-group">
                                        <label htmlFor="breakfast ">Breakfast</label>
                                        <div className="pro-input-div">
                                            <Field type="time" id="breakfast" name="breakfast" className="pro-input" />
                                        </div>
                                        <ErrorMessage name="breakfast" component="div" className='error' />
                                    </div>

                                </div>
                                <div className="pro-username">
                                    <div className="pro-form-group">
                                        <label htmlFor="lunch ">Lunch</label>
                                        <div className="pro-input-div">
                                            <Field type="time" id="lunch" name="lunch" className="pro-input" />
                                        </div>
                                        <ErrorMessage name="lunch" component="div" className='error' />
                                    </div>
                                    <div className="pro-form-group">
                                        <label htmlFor="dinner ">Dinner</label>
                                        <div className="pro-input-div">
                                            <Field type="time" id="dinner" name="dinner" className="pro-input" />
                                        </div>
                                        <ErrorMessage name="dinner" component="div" className='error' />
                                    </div>

                                </div>
                                <div className="pro-username">
                                    <div className="pro-form-group">
                                        <label htmlFor="waketime ">Wake Time</label>
                                        <div className="pro-input-div">
                                            <Field type="time" id="waketime" name="waketime" className="pro-input" />
                                        </div>
                                        <ErrorMessage name="waketime" component="div" className='error' />
                                    </div>
                                    <div className="pro-form-group">
                                        <label htmlFor="bedtime ">Bed Time</label>
                                        <div className="pro-input-div">
                                            <Field type="time" id="bedtime" name="bedtime" className="pro-input" />
                                        </div>
                                        <ErrorMessage name="bedtime" component="div" className='error' />
                                    </div>

                                </div>

                                <div className="pro-username pt-3">
                                    <div className='pl-2 radio-inside'>
                                        <label htmlFor="waketime  ">Weight</label>
                                        <div className='d-flex mt-2'>
                                            <div className='radio-inner'> Kg<Field type="radio" id="weight" name="weight" value="kg" /></div>
                                            <div> lbs<Field type="radio" id="weight" name="weight" value="lbs" /></div>

                                        </div>
                                        <ErrorMessage name="waketime" component="div" className='error' />
                                    </div>
                                    <div className="radio-inside">
                                        <div className='pl-2'>
                                            <label htmlFor="waketime ">Height</label>
                                            <div className='d-flex mt-2'>
                                                <div className='radio-inner'> cm<Field type="radio" id="height" name="height" value="cm" /></div>
                                                <div> ft/inches<Field type="radio" id="height" name="height" value="ft/inches" /></div>

                                            </div>
                                            <ErrorMessage name="waketime" component="div" className='error' />
                                        </div>
                                    </div>

                                </div>
                                <div className="pro-username pt-3">
                                    <div className='pl-2 radio-inside'>
                                        <label htmlFor="waketime  ">Blood Glucose</label>
                                        <div className='d-flex pt-3'>
                                            <div className='radio-inner'> mmo/l<Field type="radio" id="bloodGlucose" name="bloodGlucose" value="mmo/l" /></div>
                                            <div> mg/dl<Field type="radio" id="bloodGlucose" name="bloodGlucose" value="mg/dl" /></div>

                                        </div>
                                        <ErrorMessage name="bloodGlucose" component="div" className='error' />
                                    </div>
                                    <div className="radio-inside">
                                        <div className='pl-2'>
                                            <label htmlFor="waketime ">Blood Pressure</label>
                                            <div className='d-flex pt-3'>
                                                <div className='radio-inner'> kPa<Field type="radio" id="bloodPressure" name="bloodPressure" value="kPa" /></div>
                                                <div> mmHg<Field type="radio" id="bloodPressure" name="bloodPressure" value="mmHg" /></div>

                                            </div>
                                            <ErrorMessage name="bloodPressure" component="div" className='error' />
                                        </div>
                                    </div>

                                </div>
                                <div className="pro-username pt-3">
                                    <div className='pl-2 radio-inside'>
                                        <label htmlFor="waketime  ">Cholestrol</label>
                                        <div className='d-flex pt-3'>
                                            <div className='radio-inner'> mmo/l<Field type="radio" id="Cholestrol" name="Cholestrol" value="mmo/l" /></div>
                                            <div> mg/dl<Field type="radio" id="Cholestrol" name="Cholestrol" value="mg/dl" /></div>

                                        </div>
                                        <ErrorMessage name="Cholestrol" component="div" className='error' />
                                    </div>
                                    <div className="radio-inside">
                                        <div className='pl-2'>
                                            <label htmlFor="waketime ">Distance</label>
                                            <div className='d-flex pt-3'>
                                                <div className='radio-inner'> km<Field type="radio" id="distance" name="distance" value="km" /></div>
                                                <div> miles<Field type="radio" id="distance" name="distance" value="miles" /></div>

                                            </div>
                                            <ErrorMessage name="distance" component="div" className='error' />
                                        </div>
                                    </div>

                                </div>
                                <hr className='hr mt-2'></hr>
                                <div className='checkbox  '>
                                    <label htmlFor="waketime  " className='pl-2'>Communication Type</label>
                                    <hr className='hr'></hr>
                                    <div className="pro-username ">
                                        <div className='pl-2 radio-inside'>

                                            <div className='d-flex pt-3'>
                                                <div className='radio-inner'> System Emails<Field type="checkbox" id="communication" name="communication" value="mmo/l" /></div>

                                            </div>
                                            <ErrorMessage name="communication" component="div" className='error' />
                                        </div>
                                        <div className="radio-inside">
                                            <div className='pl-2'>
                                                <div className='d-flex pt-3'>
                                                    <div className='radio-inner'> Member Services Emails<Field type="checkbox" id="communication" name="communication" value="MemberServicesEmails" /></div>

                                                </div>
                                                <ErrorMessage name="communication" component="div" className='error' />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="pro-username pt-3">
                                        <div className='pl-2 radio-inside'>

                                            <div className='d-flex '>
                                                <div className='radio-inner'> SMS<Field type="checkbox" id="communication" name="communication" value="sms" /></div>

                                            </div>
                                            <ErrorMessage name="communication" component="div" className='error' />
                                        </div>
                                        <div className="radio-inside">
                                            <div className='pl-2'>
                                                <div className='d-flex '>
                                                    <div className='radio-inner'> Phone Call<Field type="checkbox" id="communication" name="communication" value="phoneCall" /></div>

                                                </div>
                                                <ErrorMessage name="communication" component="div" className='error' />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="pro-username pt-3">
                                        <div className='pl-2 radio-inside'>

                                            <div className='d-flex '>
                                                <div className='radio-inner'> Post<Field type="checkbox" id="communication" name="communication" value="post" /></div>

                                            </div>
                                            <ErrorMessage name="communication" component="div" className='error' />
                                        </div>


                                    </div>
                                </div>

                                <div className='profile-btn'>
                                    <button type="submit" className="main-color btn mr-5">UPDATE</button>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>
                </Form>
            </Formik>
            <ToastContainer />


        </div>
    )
}

export default Preferences