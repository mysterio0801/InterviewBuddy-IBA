import React, {useState, useRef, useEffect} from 'react'
import Popup from 'reactjs-popup'
import DatePicker from 'react-date-picker'
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "react-date-picker/dist/DatePicker.css";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import trash from '../../logo/trash.png';
// import ShowParticipant from '../ShowParticipants';

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


const initialInterviewDetail = {
    title: "",
    user_id: 0,
    date: new Date(),
    participanst: []
}

function CreateInterviewPopup(props) {
    const today = new Date();
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setDate] = useState(today);
    const [startTime, setStartTime] = useState(moment());
    const [endTime, setEndTime] = useState(moment());
    const closeModal = () => setOpen(false);

    const [interviewDetail, setInterviewDetail] = useState(initialInterviewDetail);
    const [participantList, setParticipantList] = useState([]);

    const selectDateHandler = (d) => {
        setDate(d)
    }

    const {triggerClose, popupRef, setOpen} = props

    const handleStartTimePicker = (value) =>{
        setStartTime(value);
    }

    const handleEndTimePicker = (value) =>{
        setEndTime(value);
    }

    const handleAddParticipant = async (event) => {
        event.preventDefault();
        let data = {};
        const promise = await axios.get(`http://localhost:8000/users/getUserByEmail/${email}/`).then((res)=>data = res.data);
        
        if(data.data===null){
            console.log("undable to fetch")
            return;
        }

        event.preventDefault();
        console.log(endTime.format('HH:mm'));
        const participant = {
            email,
            id: data.data.id,
            startTime: startTime.format('HH:mm'),
            endTime: endTime.format('HH:mm')
        }
        setParticipantList(participantList => [...participantList,participant]);
    }

    useEffect(()=>{
        console.log(participantList);
    },[participantList])

    const handleTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleSubmit = () => {
        const desiredList = participantList.map(item=>{
            return {
                id: item.id,
                start_time: item.startTime,
                end_time: item.endTime
            }
        })

        console.log(desiredList);

        axios.post("http://localhost:8000/interviews/addInterviewSession",{
            title,
            user_id: localStorage.getItem('user_id'),
            date: startDate,
            participants: desiredList
        })
        .then(res => {
            console.log(res);
            popupRef.current.close();
            setOpen(false);
        })
        .catch(err =>{
            console.log(err);
        });
    }

    const handleDelete = (id) => () => {
        setParticipantList(participantList => participantList.filter(item=>item.id!==id));
    }

    

  return (
    <>
        <div className = "add-interview-popup-container" style={{display:'flex'}}>
                <div className = "popup-header">
                    Add Interview
                </div>
                <form>
                    <div className = "form-input-container">
                        <input className = "form-input" value = {title} placeholder="Interview Title" name ="Interview Title" onChange = {handleTitleChange}></input>

                            {/* <input className = "form-input" style={{marginRight: '9px', width:'172px'}} label = "date" placeholder="DD/MM/YYYY" name ="date"></input> */}
                            {/* <input className = "form-input" style={{width:'172px'}} label = "startTime" placeholder="00:00" name = "startTime"></input> */}
                            <DatePicker
                                className="form-input-date"
                                dateFormat="dd/mm/yyyy"
                                value={startDate}
                                selected={startDate}
                                onChange={selectDateHandler} 
                                minDate={today}
                                todayButton={"Today"}/>
                    </div>
                    <div className="break"></div>
                    <div className='form-input-container'>
                        <div className='form-label'>
                            Add Participants
                        </div>
                        <input className = "form-input" label = "Email ID" placeholder="Email ID" name ="Email ID" onChange = {(event)=>setEmail(event.target.value)}></input>
                        
                        <div className='time-container'>
                            <div className='time-container-item'>
                                <div className='form-label'>Start Time</div>
                                <StyledTimer
                                    defaultValue={moment()}
                                    name={"startTime"}
                                    value={startTime}
                                    onChange={handleStartTimePicker}
                                    showSecond={false}
                                />
                            </div>
                            <div className='time-container-item'>
                                <div className='form-label'>End Time</div>
                                <StyledTimer
                                    defaultValue={moment()}
                                    name={"endTime"}
                                    value={endTime}
                                    onChange={handleEndTimePicker}
                                    showSecond={false}
                                />
                            </div>
                        </div>

                        <button className='save-button' style={{padding:'2%', margin:'7.5% 0%'}} onClick = {handleAddParticipant}>Add Participant</button>
                    </div>
                    <div>
                    </div>
                </form>
                <div className = "participant-popup">
                    {
                        participantList.map(item => {
                            return(
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: ' 2 20px',
                                    justifyItems: 'space-between'
                                }}>
                                    <div>
                                        {item.email}
                                    </div>
                                    <div style={{
                                            display:'flex'
                                        }}
                                        onClick = {handleDelete(item.id)}>
                                        <img className='delete-icon' src={trash} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex-row">
                    <button className='save-button' style={{padding:'3% 6%', margin:'7.5% 0%'}} onClick = {handleSubmit}>Create Interview</button>
                    <button className='save-button' style={{padding:'3% 6%', margin:'7.5% 0%'}} onClick = {triggerClose}>Cancel</button>
                </div>
            </div>
    </>
  )
}

export default CreateInterviewPopup