import React from 'react'
import DatePicker from 'react-date-picker'
import "react-date-picker/dist/DatePicker.css";
import moment from 'moment';

function AddParticipant() {
  return (
    <div className = "add-participant-container" style={{display:'flex'}}>
        <div className = "participant-header">
            Add Participants
        </div>
        <form onSubmit>
            <div className = "form-input-container">
                <input className = "form-input" label = "Email ID" placeholder="Email ID" name ="Interview Title" onChange></input>

                    {/* <input className = "form-input" style={{marginRight: '9px', width:'172px'}} label = "date" placeholder="DD/MM/YYYY" name ="date"></input> */}
                    {/* <input className = "form-input" style={{width:'172px'}} label = "startTime" placeholder="00:00" name = "startTime"></input> */}
                    {/* <DatePicker
                        className="form-input-date"
                        dateFormat="dd/mm/yyyy"
                        value={startDate}
                        selected={startDate}
                        onChange={selectDateHandler} 
                        minDate={today}
                        todayButton={"Today"}/> */}
                
            </div>
        </form>
        <button className='save-button'>
            Save Session
        </button>
    </div>
  )
}

export default AddParticipant