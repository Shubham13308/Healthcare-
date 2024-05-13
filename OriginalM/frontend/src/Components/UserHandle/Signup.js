import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../Images/signup.jpeg"
import './Signup.css'
import Footer from "../../Assets/UI/Footer";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const response = await axios.post(
        "http://127.0.0.1:3002/users/register",
        values
      );
      if (response.data.error) {
        toast.error(response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate("/login");
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
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="signup-form">
            <div className="left-side">
              <img src={signup} alt="Signup" width="100%" height="100%" />
            </div>
            <div className="right-side">
              <h1 className="form-group">Sign Up</h1>
              <div className="line"></div>
              <div className="form-group">
                <div className="username">
                  <div>
                    <label htmlFor="firstname">First Name</label>
                    <Field
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="input"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname">Last Name</label>
                    <Field
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="input"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" className="input" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="input"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>

              <Link to="/" className="form-group link-togglr_login">
                Login
              </Link>
              <div>
                {" "}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-group main-color btn">
                  {isSubmitting ? "Signing up..." : "SIGN UP"}
                </button>
              </div>
              <ToastContainer />
            </div>
          </div>
        </Form>
      )}
    </Formik>
    <Footer/>
    </>
  );
};

export default Signup;
