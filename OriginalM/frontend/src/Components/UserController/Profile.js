import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Leftbar from '../../Assets/UI/Leftbar';
import Footer from '../../Assets/UI/Footer';
import profile from '../../Images/profile.png'

import { Header } from '../../Assets/UI/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const maritalStatusOptions = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
];
const genderStatusOptions = [
  'Male',
  'Female',
  'Others',
];

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [currentSection, setCurrentSection] = useState('basic');

  const fileRef = useRef(null);

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    socialSecurity: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    ZipCode: '',
    image: null,
    dob: '',
    gender: '',
    martialStatus: '',
    social: '',
    kids: '',
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone number is required'),
    socialSecurity: Yup.string().matches(/^[0-9]{6}$/, 'Invalid Social Security').required('Social Security is required'),
    addressOne: Yup.string().required('Address One is required'),
    addressTwo: Yup.string().required('Address Two is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    ZipCode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid zip code').required('Zip code is required'),
    gender: Yup.string().required('gender is required'),
    dob: Yup.string().required('dob is required'),
    martialStatus: Yup.string().required('Martial Status is required'),
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
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserDetails();
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, setFieldValue) => {
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('socialSecurity', values.socialSecurity);
    formData.append('addressOne', values.addressOne);
    formData.append('addressTwo', values.addressTwo);
    formData.append('city', values.city);
    formData.append('state', values.state);
    formData.append('ZipCode', values.ZipCode);
    formData.append('dob', values.dob);
    formData.append('gender', values.gender);
    formData.append('martialStatus', values.martialStatus);
    formData.append('social', values.social);
    formData.append('kids', values.kids);

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return;
    }

    try {
      const response = await axios.put('http://127.0.0.1:3002/users/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Profile updated successfully!');
        fetchUserDetails();
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Error submitting the form. Please try again later.');
    }
  };

  return (
    <div className='profile'>
      <div className='left_profile' style={{ height: '100%' }}>
        <Leftbar />
      </div>
      <Formik
        initialValues={userDetails ? userDetails : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className='profile-form'>
            <ToastContainer />
            <div className='right-profile'>

              <Header image={userDetails?.image} name={values?.firstname} lname={values?.lastname} />
              <div className='profile-hero'>
                <div className='profile-main '>
                  <div className='profile-head'>
                    <FaArrowLeft className='pro-arrow' />
                    <p className='pro-arrow-text'>Profile</p>
                  </div>
                  <div className='pro-changePic'>
                    <div className='pro-header'>
                      <div className='pro-header-img'>
                        <img
                          src={userDetails?.image ? `http://127.0.0.1:3002/${userDetails.image}` : profile}
                          alt="profile"
                          width='100%'
                          className='profile-img'
                        />
                      </div>
                      <div className='pro-greet-name'>
                        <p className='pro-greet'>Upload a New Photos</p>
                        <p className='pro-profile-name'>{values.firstname} {values.lastname}</p>
                      </div>
                    </div>
                    <div>
                      <input
                        hidden
                        ref={fileRef}
                        type="file"
                        onChange={(e) => setFieldValue('image', e.currentTarget.files[0])}
                      />
                      <button type="button" onClick={() => { fileRef.current.click() }}>Change Picture</button>
                    </div>
                  </div>
                </div>
                <p className='info-head'>Change Information</p>
                <div className='profile-main white'>
                  <div className='detail-links'>
                    <Link
                      className={`detail-link ${currentSection === 'basic' ? 'active' : ''}`}
                      onClick={() => setCurrentSection('basic')}
                    >
                      Basic Details
                    </Link>
                    <Link
                      className={`detail-link ${currentSection === 'personal' ? 'active' : ''}`}
                      onClick={() => setCurrentSection('personal')}
                    >
                      Personal Details
                    </Link>
                  </div>

                  {currentSection === 'basic' && (
                    <div className='basic-detail'>
                      <div className="pro-usernames">
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="firstname">First Name *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="firstname" name="firstname" className="pro-input" />
                            </div>
                            <ErrorMessage name="firstname" component="div" className='error' />
                          </div>
                          <div className="pro-form-groups">
                            <label htmlFor="lastname">Last Name *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="lastname" name="lastname" className="pro-input" />
                            </div>
                            <ErrorMessage name="lastname" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="email">Enter Email *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="email" name="email" className="pro-input" />
                            </div>
                            <ErrorMessage name="email" component="div" className='error' />
                          </div>
                          <div className="pro-form-groups">
                            <label htmlFor="socialSecurity">Social Security (Numbers Only) *</label>
                            <div className="pro-input-div">
                              <Field type="number" id="socialSecurity" name="socialSecurity" className="pro-input" />
                            </div>
                            <ErrorMessage name="socialSecurity" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="phoneNumber">Mobile Number *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="phoneNumber" name="phoneNumber" className="pro-input" />
                            </div>
                            <ErrorMessage name="phoneNumber" component="div" className='error' />
                          </div>
                          <div className="pro-form-groups">
                            <label htmlFor="addressOne">Address One *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="addressOne" name="addressOne" className="pro-input" />
                            </div>
                            <ErrorMessage name="addressOne" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="addressTwo">Address Two *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="addressTwo" name="addressTwo" className="pro-input" />
                            </div>
                            <ErrorMessage name="addressTwo" component="div" className='error' />
                          </div>
                          <div className="pro-form-groups">
                            <label htmlFor="city">City *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="city" name="city" className="pro-input" />
                            </div>
                            <ErrorMessage name="city" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="state">State *</label>
                            <div className="pro-input-div">
                              <Field type="text" id="state" name="state" className="pro-input" />
                            </div>
                            <ErrorMessage name="state" component="div" className='error' />
                          </div>
                          <div className="pro-form-groups">
                            <label htmlFor="ZipCode">Home Zip Code *</label>
                            <div className="pro-input-div">
                              <Field type="number" id="ZipCode" name="ZipCode" className="pro-input" />
                            </div>
                            <ErrorMessage name="ZipCode" component="div" className='error' />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSection === 'personal' && (
                    <div className='prsnl-detail'>
                      <div className="pro-usernames">
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="dob">DOB *</label>
                            <div className="pro-input-div">
                              <Field type="date" id="dob" name="dob" className="pro-input" />
                            </div>
                            <ErrorMessage name="dob" component="div" className='error' />
                          </div>
                          <div className="pro-form-group">
                            <label htmlFor="gender">Gender</label>
                            <div className="pro-input-div">
                              <Field as="select" id="gender" name="gender" className="pro-input">
                                <option value="" label="Select gender" />
                                {genderStatusOptions.map((status) => (
                                  <option key={status} value={status} label={status} />
                                ))}
                              </Field>
                            </div>
                            <ErrorMessage name="gender" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="martialStatus">Martial Status</label>
                            <div className="pro-input-div">
                              <Field as="select" id="martialStatus" name="martialStatus" className="pro-input">
                                <option value="" label="Select Martial Status" />
                                {maritalStatusOptions.map((status) => (
                                  <option key={status} value={status} label={status} />
                                ))}
                              </Field>
                            </div>
                            <ErrorMessage name="martialStatus" component="div" className='error' />
                          </div>
                          <div className="pro-form-group">
                            <label htmlFor="social">Social </label>
                            <div className="pro-input-div">
                              <Field type="text" id="social" name="social" className="pro-input" />
                            </div>
                            <ErrorMessage name="social" component="div" className='error' />
                          </div>
                        </div>
                        <div className="pro-username">
                          <div className="pro-form-group">
                            <label htmlFor="kids">Kids (If Any ) </label>
                            <div className="pro-input-div">
                              <Field type="text" id="kids" name="kids" className="pro-input" />
                            </div>
                            <ErrorMessage name="kids" component="div" className='error' />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='profile-btn'>
                    <button type="submit" className="main-color btn mr-3">UPDATE</button>
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

export default Profile;
