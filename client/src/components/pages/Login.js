import react, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

import { SERVER_URL } from "../utils/variables";
import Layout from "../utils/Layout";
import { ButtonContained, ButtonText } from "../utils/Button";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [userData, setUserData] = useState(null);
  const [errorFill, setErrorFill] = useState(false);

  const onClickLogin = async (e) => {
    e.preventDefault();
    if (username !== null && password !== null) {
      setErrorFill(false);
    } else {
      setErrorFill(true);
    }

    try {
      const loginRes = await axios.post(`${SERVER_URL}/api/login`, {
        username,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const renderErrorFill = () => {
    return (
      <div className="error">
        Please make sure all fields are filled in correctly.
      </div>
    );
  };

  return (
    <Layout>
      <div className="form form--login">
        <div className="input__feild">
          <span>
            <BsFillPersonFill className="icon icon--medium" />{" "}
          </span>
          <input
            type="text"
            placeholder="Username"
            className="input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input__feild">
          <span>
            <MdPassword className="icon icon--medium" />{" "}
          </span>
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          onClick={(e) => {
            if (!errorFill) onClickLogin(e);
          }}
        >
          <ButtonContained name="Login" />
        </div>
        <Link to="/register">
          <ButtonText name="New student?" />
        </Link>

        {errorFill ? renderErrorFill() : null}
      </div>
    </Layout>
  );
};

export default Login;
