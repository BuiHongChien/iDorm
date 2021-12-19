import react from "react";
import {IoClose} from 'react-icons/io'

import Button from '@mui/material/Button'
import RoommateCard from "./RoommateCard";

const RoommateForm= (props) => {
  return (
    <div className="form">
        <button className='button button--close'></button>
        <div className='form__title'>1112</div>
        <div className='form__body form--list'>
            <RoommateCard list={props} />
        </div>
        <Button class='button' variant='contained'>Choose</Button>
    </div>
  );
};

export default RoommateForm;
