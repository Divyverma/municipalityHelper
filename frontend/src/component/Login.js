import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router";
import Loader from "./Loader";
import {toast} from 'react-toastify'
const url = process.env.REACT_APP_SERVER_URL

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  const submitLogin = async () => {
    setLoader(true)
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, pass}),
    });


    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      localStorage.setItem("authToken", data.post);
      setLoader(false)
      navigate("/");
    } else {
      toast.error(data.message)
    }
  };

  if(loader){
    return(
      <>
      <div className="log-container loader" >
        <Loader/>
      </div>
      </>
    )
  }

  return (
    <div className="log-container">
      <div className="log-login-form">
        <h2 className="log-heading">Login here</h2>
        <div className="log-input-fields">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button onClick={submitLogin}>Login</button>
        <p>
          Don't have account? <Link to="/register">Register Here</Link>
        </p>
      </div>

      <div className="log-design-part">
        {/* design */}
        <h1>Welcome Back!</h1>
        <p>Get started</p>
      </div>
    </div>
  );
};

export default Login;
