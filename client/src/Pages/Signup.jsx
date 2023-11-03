import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import isStrongPassword from "../utils/isStrongPassword";
import { useDispatch } from "react-redux";
import validateEmail from "../utils/validateEmail";
import { signup } from "../store/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateEmail(creds.email) === false)
      toast.error("Please enter a valid email");
    else if (isStrongPassword(creds.password) === false)
      toast.error(
        "Your password must be a minimum of 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character to ensure its strength and security."
      );
    else if (creds.password !== creds.cPassword)
      toast.error("Password and Confirm Password should be same");
    dispatch(signup(creds));
  };
  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-heading-container">
          <h2 className="signup-heading">Welcome to NotesKey</h2>
        </div>
        <div className="signup-form-container">
          <h3> Sign Up</h3>
          <form>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              name="name"
              value={creds.name}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={creds.email}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              name="password"
              value={creds.password}
              onChange={onChangeHandler}
            />
            <input
              className="input-field"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="cPassword"
              value={creds.cPassword}
              onChange={onChangeHandler}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                marginLeft: "1rem",
              }}
            >
              <input
                className="cpassword-checkbox"
                type="checkbox"
                name="cpassword-checkbox"
                checked={showPassword}
                onClick={() => {
                  if (showPassword === false) setShowPassword(true);
                  else setShowPassword(false);
                }}
              />
              <span className="show-pass-label">Show Password</span>
            </div>
            <button
              onClick={submitHandler}
              type="submit"
              className="signup-button"
            >
              Signup<i class="fa-solid fa-right-to-bracket"></i>
            </button>
            <p>
              Already have an account?{" "}
              <Link style={{ color: "#3636d5" }} to="/login">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
