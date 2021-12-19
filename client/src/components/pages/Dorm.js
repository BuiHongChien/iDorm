import { useState, useEffect } from "react";
import axios from 'axios';

import LayoutHome from "../utils/LayoutHome";
import RoomCard from "../utils/RoomCard";
import SearchBar from "../utils/SearchBar";
import SideBar from "../utils/SideBar";
import { SERVER_URL } from "../utils/variables";

const Dorm = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const href = window.location.href;
    setId(href.split(":").pop());

    const params={buildingId: id }

    const getData = () => {
      return axios
        .get(`${SERVER_URL}/api/rooms`, { params})
        .then((res) => {
          return res.data;
        });
    };

    getData()
      .then((rooms) => {
        setData(rooms);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const renderRooms = () => {
    return data.map((room) => {
      return (
        <RoomCard
          id={room._id}
          room={room.number}
          floor={room.floor}
          type={room.peopleMax}
          roommate={room.peopleLive}
          gender={room.type}
          slot={room.peopleMax - room.peopleLive}
          cost={room.price}
        />
      );
    });
  };

  return (
    <LayoutHome>
      <div className="dorm__wrapper">
        {data!==null?<SideBar dormId={id}/>:null}
        <div className="dorm__body">
          <div className="dorm__container">
            <SearchBar />
            <div className="card--room__wrapper">
              <div className="card--room__container">{data!==null?renderRooms():null}</div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Dorm;
