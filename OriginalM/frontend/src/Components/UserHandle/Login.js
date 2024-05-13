import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import signup from '../../Images/signup.jpeg'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import '../App.css';
import { Link } from 'react-router-dom';
import Footer from '../../Assets/UI/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values) => {
        const data = {
            email: values.email,
            password: values.password
        };

        try {
            const response = await axios.post('http://127.0.0.1:3002/users/login', data);
            console.log("Response:", response);
            if (response.data.error) {
                toast.error(response.data.error); 
            } else {
                const { token } = response.data;
                localStorage.setItem('jwtToken', token);
                navigate('/dashboard');
                toast.success('Login successful!'); 
            }
        } catch (error) {
            console.log("Error: ", error.message);
            toast.error('Email or password is wrong'); 
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <ToastContainer />
                <div className="signup-form">
                    <div className='left-side'><img src={signup} alt="Signup" width='100%' /></div>
                    <div className='right-side'>
                        <h1 className="form-group">Login Your Account</h1>
                        <div className="line"></div>

                        <div className="form-group">
                            <label htmlFor="email">Enter Email</label>
                            <Field type="email" id="email" name="email" className="input" />
                            <ErrorMessage name="email" component="div" className='error' />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="input"
                            />
                            <ErrorMessage name="password" component="div" className='error' />
                        </div>

                        <Link to="/signup" className="form-group link-togglr_login">Signup</Link>
                        <div>
                            <button type="submit" className="form-group main-color btn">LOGIN</button>
                        </div>
                    </div>
                </div>

                <Footer />
            </Form>
        </Formik>
    );
};

export default Login;
