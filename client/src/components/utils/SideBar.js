import react, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { SERVER_URL } from "./variables";

const typeOptions = [
  "for 1 person",
  "for 2 people",
  "for 3 people",
  "fore 4 people",
];
const genderOptions = ["male", "female", "other"];
const animalOptions = ["no anamals", "cat", "dog", "other"];

const SideBar = ({ dormId }) => {
  const [type, setType] = useState(null);
  const [gender, setGender] = useState(null);
  const [animal, setAnimal] = useState(null);
  const [dorm, setDorm] = useState(null);

  useEffect(() => {
    const getData = async () => {
      return axios
        .get(`${SERVER_URL}/api/buildings`, { crossdomain: true })
        .then((res) => {
          const getDorm = res.data.find(({ _id }) => _id === dormId);
          return getDorm;
        });
    };

    getData()
      .then((data) => {
        console.log(data);
        setDorm(data);
        console.log(dorm);
      })
      .catch((err) => console.error(err));
  }, [dormId]);

  const renderOptions = (value) => {
    return value.map((o) => {
      return <MenuItem value={o}>{o}</MenuItem>;
    });
  };

  const renderDropdown = (value, name) => {
    return (
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={name}
          onChange={
            name === "Type"
              ? (e) => setType(e.target.value)
              : name === "Gender"
              ? (e) => setGender(e.target.value)
              : (e) => setAnimal(e.target.value)
          }
          label={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderOptions(value)}
        </Select>
      </FormControl>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__title">
        {dorm !== null
          ? dorm.buildingName === "dorm1"
            ? "Dorm 1"
            : dorm.buildingName === "dorm2"
            ? "Dorm 2"
            : "Dorm 3"
          : null}
      </div>
      <div className="sidebar__filter">
        <div className="sidebar__text">
          <em>{dorm !== null ? dorm.address : null}</em>
        </div>
        {/* <div className="sidebar__text">Filter</div>
        <div className="dropdown__container">
          {renderDropdown(typeOptions, "Type")}
          {renderDropdown(animalOptions, "Animal")}
          {renderDropdown(genderOptions, "Gender")}
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
