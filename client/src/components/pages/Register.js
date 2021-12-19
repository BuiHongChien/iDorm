import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CountryDropdown } from "react-country-region-selector";
import { MdPassword } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillPersonFill, BsArrowLeft } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

import Layout from "../utils/Layout";
import { ButtonContained } from "../utils/Button";
import { SERVER_URL } from "../utils/variables";

const Register = () => {
  const navigate = useNavigate();
  const [openSecondForm, setOpenSecondForm] = useState(false);
  const [openFirstForm, setOpenFirstForm] = useState(true);
  const [error, setError] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [animals, setAnimals] = useState(null);

  const [userData, setUserData] = useState(null);

  const onClickRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: name,
        email,
        phone,
        gender,
        country,
        username,
        password,
        pet: animals,
      };
      // console.log(newUser);
      await axios.post(`${SERVER_URL}/api/register`, {fullname: name,
        email,
        phone,
        gender,
        country,
        username,
        password,
        pet: animals,});
        
      const loginRes = await axios.post(`${SERVER_URL}/api/login`, {
        username,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        userid: loginRes.data.userId,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const onClickNext = () => {
    if (
      name !== null &&
      email !== null &&
      phone !== null &&
      gender !== null &&
      country !== null &&
      username !== null &&
      password !== null
    ) {
      setOpenFirstForm(false);
      setOpenSecondForm(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const renderError = () => {
    return (
      <div className="error">
        Please make sure all fields are filled in correctly.
      </div>
    );
  };

  const renderFirstForm = () => {
    return (
      <div className="form form--register">
        <div className="input__feild">
          <span>
            <BsFillPersonFill className="icon icon--medium" />{" "}
          </span>
          <input
            type="text"
            placeholder="Fullname"
            value={name}
            className="input"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input__feild">
          <span>
            <SiGmail className="icon icon--medium" />{" "}
          </span>
          <input
            type="gmail"
            value={email}
            placeholder="123@gmail.com"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__feild">
          <span>
            <FaPhoneAlt className="icon icon--medium" />{" "}
          </span>
          <input
            type="text"
            placeholder="Phone number"
            className="input"
            rrequired
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div class="input__feild radio">
          <input
            type="radio"
            name="radiogroup1"
            id="rd1"
            className="radio__input"
            value={gender}
            onChange={(e) => setGender('male')}
          />
          <label for="rd1" className="radio__label">
            Male
          </label>
          <input
            type="radio"
            name="radiogroup1"
            id="rd2"
            className="radio__input"
            value={gender}
            onChange={(e) => setGender("female")}
          />
          <label for="rd2" className="radio__label">
            Female
          </label>
        </div>

        <div className="input__feild">
          <span>
            <BsFillPersonFill className="icon icon--medium" />{" "}
          </span>
          <input
            type="text"
            placeholder="Username"
            className="input"
            rrequired
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
            rrequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input__feild">
          <span>
            <BsFillPersonFill className="icon icon--medium" />{" "}
          </span>
          <CountryDropdown
            value={country}
            className="input dropdown"
            onChange={(e) => setCountry(e)}
          />
        </div>

        <div onClick={(e) => onClickNext()}>
          <ButtonContained name="Next" />
          {error ? renderError() : null}
        </div>
      </div>
    );
  };

  const renderSecondForm = () => {
    return (
      <div className="form form--register">
        <button
          className="button button--back"
          onClick={(e) => {
            e.preventDefault();
            setOpenFirstForm(true);
            setOpenSecondForm(false);
          }}
        >
          <BsArrowLeft className="icon icon--small" />
        </button>
        <div className="ques">
          Do you have any pet? <em>(not require) </em>
        </div>
        <div className="input__feild radio radio--lis">
          <input
            type="radio"
            name="radiogroup2"
            id="rd2"
            className="radio__input"
            value={animals}
            onChange={(e) => setAnimals("cat")}
          />
          <label for="rd1" className="radio__label">
            Cat
          </label>
          <input
            type="radio"
            name="radiogroup2"
            id="rd2"
            className="radio__input"
            value={animals}
            onChange={(e) => setAnimals("dog")}
          />
          <label for="rd2" className="radio__label">
            Dog
          </label>
          <input
            type="radio"
            name="radiogroup2"
            id="rd2"
            className="radio__input"
            value={animals}
            onChange={(e) => setAnimals("other")}
          />
          <label for="rd2" className="radio__label">
            Other
          </label>
        </div>

        <div onClick={(e) => onClickRegister(e)}>
          <ButtonContained name="Register" />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {openFirstForm ? renderFirstForm() : null}
      {openSecondForm ? renderSecondForm() : null}
    </Layout>
  );
};

export default Register;
