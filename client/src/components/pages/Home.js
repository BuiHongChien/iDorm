import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import dorm1 from "../../styles/images/dorm1.png";
import dorm2 from "../../styles/images/dorm2.png";
import dorm3 from "../../styles/images/dorm3.png";
import dorm4 from "../../styles/images/dorm4.png";

import LayoutHome from "../utils/LayoutHome";
import { SERVER_URL } from "../utils/variables";

const Home = () => {
  const [dorms, setDorms] = useState(null);

  useEffect(() => {
    const getData = async () => {
      return axios
        .get(`${SERVER_URL}/api/buildings`, { crossdomain: true })
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    };

    getData()
      .then((data) => {
        setDorms(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderDorms = () => {
    return dorms.map((dorm) => {
      return (
        <div className="card--dorm">
          <Link
            to={`/info/:${dorm._id}`}
            target="__blank"
            className="card--dorm__link"
          >
            <img
              className="card--dorm__img"
              alt="img"
              src={
                dorm.buildingName === "dorm1"
                  ? dorm1
                  : dorm.buildingName === "dorm2"
                  ? dorm2
                  : dorm.buildingName === "dorm3"
                  ? dorm3
                  : dorm4
              }
            />
            <div className="card--dorm__title">{dorm.buildingName}</div>
            <div className="card--dorm__info">
              <FaMapMarkerAlt className="icon icon--small icon--margin" />
              {dorm.address}
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <LayoutHome>
      <div className="home__wrapper">
        <div className="home__container">
          <div className="home__title">
            Which dormitory are you looking for?
          </div>
          <div className="home__list">
            {dorms !== null ? renderDorms() : ''}
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Home;
