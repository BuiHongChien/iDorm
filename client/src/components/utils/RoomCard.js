import react, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { MdAttachMoney } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBuilding, FaMale, FaFemale } from "react-icons/fa";
import { GiDogBowl, GiThreeFriends } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { ButtonContained } from "./Button";
import male from "../../styles/images/male.png";
import female from "../../styles/images/female.png";
import { SERVER_URL } from "../utils/variables";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "auto",
  height: "auto",
  border: "none",
  boxShadow: 24,
};

const RoomCard = ({ id, room, floor, type, roommate, gender, slot, cost }) => {
  const [openRoommateCard, setOpenRoommateCard] = useState(false);
  const [openMakeRequest, setOpenMakeRequest] = useState(false);
  const [roommates, setRoommates] = useState(null);
  const [token, setToken] = useState(null);
  const [reqStatus, setReqStatus] = useState(false);
  const [animals, setAnimals] = useState(null);
  const [messAlert, setMessAlert] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("auth-token");
    setToken(getToken);

    const getData = () => {
      return axios
        .get(`${SERVER_URL}/api/room`, { params: { roomId: id } })
        .then((res) => {
          return res.data;
        });
    };

    getData()
      .then((data) => {
        setRoommates(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const onClickSentRequest = async () => {
    setOpenMakeRequest(false);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      console.log("id " + id);
      const loginRes = await axios.post(
        `${SERVER_URL}/api/want`,
        { roomId: id },
        config
      );
      console.log(loginRes.data);
      if (loginRes.data) {
        setReqStatus(true);
        setMessAlert(true);
      }
    } catch (err) {
      console.error(err);
      setReqStatus(true);
        setMessAlert(false);
    }
  };

  const renderAlert = () => {
    return (
      <Modal
        open={reqStatus}
        onClose={(e) => setReqStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card card--roommate">
            <button
              className="button button--close"
              onClick={(e) => setReqStatus(false)}
            >
              <IoIosCloseCircleOutline className="icon icon--medium" />
            </button>
            <div className="card--request__h">
              {messAlert
                ? "Your request is in process!"
                : "Something went wrong. Try again!"}
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  const renderMakeRequest = () => {
    return (
      <Modal
        open={openMakeRequest}
        onClose={(e) => setOpenMakeRequest(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card card--roommate">
            <button
              className="button button--close"
              onClick={(e) => setOpenMakeRequest(false)}
            >
              <IoIosCloseCircleOutline className="icon icon--medium" />
            </button>
            <div className="card--request__h">
              Your request will be sent to manager.
            </div>
            <div className="card--request__p">
              In case room {room} does not avaiable, the manager will let you to
              another room.
            </div>
            <div onClick={(e) => onClickSentRequest()}>
              <ButtonContained name="Sent request" />
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  const renderRoommates = () => {
    return roommates.map((r) => {
      console.log(r.country)
      return (
        <div className="card--roommate__item">
          <div className="card--roommate__part card--roommate__part--left">
            <img
              className="avatar avatar--medium"
              src={r.gender === "female" ? female : male}
              alt="img"
            />
            <div className="card--person__name">{r.fullname}</div>
          </div>
          <div className="card--roommate__part card--roommate__part--right">
            <div className="card--person__item">
              <img
                src={`https://img.icons8.com/color/${r.country.toLowerCase()}`}
                alt="country"
                className="icon icon--flag"
              />
              <span className="card--person__info">{r.country}</span>
            </div>
            <div className="card--person__item">
              <FaPhoneAlt className="icon icon--medium" />
              <span className="card--person__info">{r.phone}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderRoommateCard = () => {
    return (
      <Modal
        open={openRoommateCard}
        onClose={(e) => setOpenRoommateCard(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card card--roommate">
            <button
              className="button button--close"
              onClick={(e) => setOpenRoommateCard(false)}
            >
              <IoIosCloseCircleOutline className="icon icon--medium" />
            </button>
            <div className="card--roommate__title">{room}</div>
            <div className="card--roommate__info">{renderRoommates()}</div>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <div class="card--room__item">
        <div className="card--room__title">{room}</div>
        <div className="card--room__info">
          <div className="card--room__detail">
            <div className="card--person__item">
              <MdAttachMoney class="icon icon--small" />
              <p class="left-margin">{cost} rup/month</p>
            </div>

            <div className="card--person__item">
              <BsFillPeopleFill class="icon icon--small" />
              <p class="left-margin">{type} People</p>
            </div>
            <div className="card--person__item">
              <FaBuilding class="icon icon--small" />
              <p class="left-margin">
                {floor}
                {floor === 1
                  ? "st"
                  : floor === 2
                  ? "nd"
                  : floor === 3
                  ? "rd"
                  : "th"}{" "}
                floor
              </p>
            </div>
          </div>

          <div className="card--room__detail">
            <div className="card--person__item">
              <GiDogBowl class="icon icon--small" />
              <p class="left-margin">{animals === null ? "0" : animals} pet</p>
            </div>
            <div className="card--person__item">
              {gender === "female" ? (
                <FaFemale class="icon icon--small" />
              ) : (
                <FaMale class="icon icon--small" />
              )}
              <p class="left-margin">{gender}</p>
            </div>
            <div
              onClick={(e) => setOpenRoommateCard(true)}
              className="button button--roommate card--person__item"
            >
              <GiThreeFriends class="icon icon--small" />
              <p class="left-margin">
                {roommate} {roommate > 1 ? "Roommates" : "Roommate"}
              </p>
            </div>
          </div>
        </div>

        {
          slot>0?
          <div onClick={(e) => setOpenMakeRequest(true)}>
          <ButtonContained name={`${slot} slot left`} />
        </div>:<div>
          <ButtonContained name={`0 slot left`} status='false' />
        </div>
        }
      </div>
      {openRoommateCard ? renderRoommateCard() : null}
      {openMakeRequest ? renderMakeRequest() : null}
      {reqStatus ? renderAlert() : null}
    </div>
  );
};

export default RoomCard;
