import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../App.css'; 

const AdminLogin = () => {
    const navigate =useNavigate();
  // Define initial form values
  const initialValues = {
    email: '',
    password: ''
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  // Function to handle form submission
  const handleSubmit = async (values) => {
    const data = {
        email: values.email,
        password: values.password
    };

    try {
        const response = await axios.post('http://127.0.0.1:3002/admin/adminlogin', data);
        console.log("Response:", response);
        if (response.data.error) {
            toast.error(response.data.error); // Display error toast
        } else {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            navigate('/admindashboard');
            toast.success('Login successful!'); // Display success toast
        }
    } catch (error) {
        console.log("Error: ", error.message);
        toast.error('Email or password is wrong'); // Display error toast
    }
};

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <p>Dont have an Account? <Link to="/adminregister">Register</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;
