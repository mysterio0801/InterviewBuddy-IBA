import React from 'react'
import Card from 'react-bootstrap/Card';
import share from '../../logo/share.png';
import group_logo from '../../logo/group.png';
import trash from '../../logo/trash.png';
import edit from '../../logo/pencil.png';

function ScheduledInterviews(props) {
    return (
        <Card className="scheduled-interview-card">
            <div className="interview-header" style={{display:'flex'}}>
                <a className="interview-title">
                    Scaler Interview
                </a>
                <img className="share-logo" src={share} />
            </div>
            <div className="date-time" style={{display:'flex'}}>
                <a className="date">25/09/2022</a>
                <a className="time">1:00 PM</a>
            </div>
            <div className='card-footer' style={{display:'flex'}}>
                <div className='participants' style={{display:'flex'}}>
                    <img className='group-logo' src={group_logo} />
                    <a>Participants</a>
                </div>
                {props.userType != 'Candidate' ? 
                    <div className='delete-edit' style={{display:'flex'}}>
                        <img className='delete-icon' src={trash} />
                        <img className='edit-icon' src={edit} />
                    </div>
                    :<></>
                }
            </div>
        </Card>
    )
}

export default ScheduledInterviews