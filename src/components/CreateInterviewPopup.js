import React, {useState} from 'react'
import Popup from 'reactjs-popup'

function CreateInterviewPopup() {

    const [open,setOpen] = useState(false);

    const onClickHandler = (events) => {
        setOpen(true);
    }

    const closeModal = () => setOpen(false)

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
                        <div className='date-time-group'>
                            <input className = "form-input" style={{marginRight: '9px', width:'172px'}} label = "date" placeholder="DD/MM/YYYY" name ="date"></input>
                            <input className = "form-input" style={{width:'172px'}} label = "startTime" placeholder="00:00" name = "startTime"></input>
                        </div>
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