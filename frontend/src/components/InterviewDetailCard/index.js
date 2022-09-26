import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import user from '../../logo/user.png';
import trash from '../../logo/trash.png';
import edit from '../../logo/pencil.png';
import {AddParticipant} from '../';
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import styled from 'styled-components';
import moment from 'moment';
import tz from 'moment-timezone'
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


function InterviewDetailCard(props) {
    console.log(props)
    const [participants,setParticipants] = useState(props.participants);
    const [editbool, setEditBool] = useState(-1);
    const [tempStartTime,setTempStartTime] = useState(moment());
    const [tempEndTime, setTempEndTime] = useState(moment());
    const {sessionId} = props;

    const handleEdit = (id) => () => {
        console.log(id);
        setEditBool(id);
    }

    const handleEditSubmit = (id) => (event) => {
        // axios.post(`http://localhost:8000/interviews/editInterview/2${sessionId}`, {
                
        //     })
        //     .then((response) => {
        //     console.log(response);
        //     });
        setEditBool(-1);
    }

    return (
        <>
            {participants.map((p) => {
                return(
                <Card key={p.id} className='id-card' style={{display:'flex'}}>
                    <div className = 'id-card-header'>
                        <img className='avatar' src={user} />
                        <div className='user-card-row' style={{display:'flex'}}>
                            <a className='userName'>{p.name}</a>
                            <a className='userEmail'>{p.email}</a>
                        </div>
                    </div>
                    {editbool != p.id ? <div>{moment.utc(p.interview_people.start_time).tz("Asia/Kolkata").format("hh:mm") + ' - ' + moment.utc(p.interview_people.end_time).tz("Asia/Kolkata").format("hh:mm")}</div> : <form>
                        <div className='time-container'>
                            <div className='time-container-item'>
                                <StyledTimer
                                    defaultValue={moment()}
                                    name={"startTime"}
                                    value={tempStartTime}
                                    onChange={(value) => {setTempStartTime(value)}}
                                    showSecond={false}
                                />
                            </div>
                            <div className='time-container-item'>
                                <StyledTimer
                                    defaultValue={moment()}
                                    name={"endTime"}
                                    value={tempEndTime}
                                    onChange={(value) => {setTempEndTime(value)}}
                                    showSecond={false}
                                />
                            </div>
                        </div>
                        <button onClick = {handleEditSubmit(p.id)}>Save</button>
                    </form> }
                    
                    <div className='delete-edit' style={{display:'flex', marginLeft:'500px'}}>
                        <img className='delete-icon' style={{paddingRight:'40px'}} src={trash} />
                        <button onClick={handleEdit(p.id)}><img className='edit-icon' src={edit} /></button>
                    </div>
                </Card>
            )})}
            
        </>
    )
}

export default InterviewDetailCard