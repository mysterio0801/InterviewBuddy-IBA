import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup'
import DatePicker from 'react-date-picker'
import "react-date-picker/dist/DatePicker.css";
import moment from 'moment';

function CreateInterviewPopup() {
    const today = new Date();
    const [startDate, setDate] = useState(today);
    const [timevalue, settimevalue] = useState(moment());
    const [open,setOpen] = useState(false);
    const closeModal = () => setOpen(false)

    const selectDateHandler = (d) => {
        setDate(d)
    }
    const onClickHandler = (events) => {
        setOpen(true);
    }

  return (
    <>
        <div className = "add-interview-popup-button">Isha mera button hai <button onClick = {onClickHandler}>dabado</button></div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className = "add-interview-popup-container" style={{display:'flex'}}>
                <div className = "popup-header">
                    Add Interview
                </div>
                <form onSubmit>
                    <div className = "form-input-container">
                        <input className = "form-input" label = "Interview Title" placeholder="Interview Title" name ="Interview Title" onChange></input>

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
                </form>
                <button className='save-button'>
                    Save Session
                </button>
            </div>
      </Popup>
      {open ? <div className = "popup-background"></div> : <></>}
    </>
  )
}

export default CreateInterviewPopup