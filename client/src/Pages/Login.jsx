import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-heading-container">
          <h2 className="login-heading">Welcome to NotesKey</h2>
          {
            // <h3 className="login-heading"> A platform for all your ToDos.</h3>
          }{" "}
        </div>
        <div className="login-form-container">
          <h3> Log in</h3>
          <form>
            <input className="input-field" type="email" placeholder="email" />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
            />

            <button type="submit" className="login-button">
              Login <i class="fas fa-sign-in"></i>
            </button>
            <p>
              Don't have an account? <Link style={{color:"#3636d5"}} to="/signup"> Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
