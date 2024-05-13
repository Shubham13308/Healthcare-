import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '../../App.css';

const AdminRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    fullName: Yup.string()
      .required('Full Name is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const response = await axios.post(
        "http://127.0.0.1:3002/admin/adminregister",
        values
      );
      if (response.data.error) {
        toast.error(response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate("/adminlogin");
        toast.success("Signup Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred!", { position: toast.POSITION.TOP_CENTER });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Admin Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="admin-form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="admin-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <div className="admin-form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field type="text" name="fullName" className="form-control" />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <p>Already have an account? <Link to="/adminlogin">Log In</Link></p>
          </Form>
        )}
      </Formik>
      <ToastContainer/>
    </div>
  );
};

export default AdminRegister;
