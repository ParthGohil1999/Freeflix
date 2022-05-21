import { ArrowRight } from "@material-ui/icons";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/freeflix.png";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axiosInstance.post("auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, Series, and more.</h1>
        <h2>Watch anywhere - anytime.</h2>
        <p>Already have an account?</p>
        <Link to="/login">
          <button className="loginButton">Sign In</button>
        </Link>
        <h2>OR</h2>
        <p>
          Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              <ArrowRight />
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
