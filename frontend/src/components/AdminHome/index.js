import React,{useState,useEffect,useRef} from "react";
import {
  AppBar,
  CreateInterviewCard,
  ScheduledInterviews,
  PastInterviewsCard,
  CreateInterviewPopup
} from "../";
import Container from "react-bootstrap/Container";
import interviewIcon from "../../logo/interview 1.png";
import Popup from "reactjs-popup";
import DatePicker from "react-date-picker";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "react-date-picker/dist/DatePicker.css";
import styled from "styled-components";
import moment from "moment";
import axios from 'axios';

const user_id = localStorage.getItem('user_id');

const StyledTimer = styled(TimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    font-size: 15px;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    cursor: pointer;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

function Home() {
  const popupRef = useRef(null);
  const [open,setOpen] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

    const triggerOpen = (events) => {
        events.preventDefault();
        popupRef.current.open();
        setOpen(true);
    }

    const triggerClose = (events) => {
        events.preventDefault();
        popupRef.current.close();
        setOpen(false);
    }

    

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/interviews/getInterviews/${user_id}`).then(res=>{
          setInterviews(res.data.data);
          setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
    }, []);

  return (
    <>
      <AppBar />
      <Container className="cont1">
        <div className="heading1" style={{ display: "flex" }}>
          <img className="interviewLogo" src={interviewIcon} />
          Interview Creation Portal
        </div>
        <CreateInterviewCard triggerOpen = {triggerOpen}/>
      </Container>
        <div className = "popup-modal">
            <Popup ref = {popupRef} closeOnDocumentClick={false}>
                <CreateInterviewPopup  setOpen = {setOpen} popupRef = {popupRef} triggerClose = {triggerClose}/>
            </Popup>
        </div>
        {open &&
        <div className = 'bg-popup'>

        </div>}

      <Container className="cont1">
        <div className="heading2" style={{ display: "flex" }}>
          Scheduled Interviews
        </div>
        
        <div className="scheduled-interviews" style={{ display: "flex" }}>
          {
            !loading && 
            <>
              {interviews.map(item=>{
                return <ScheduledInterviews item = {item}/>
              })}
            </>
          }
        </div>
      </Container>
    </>
  );
}

export default Home;
