import React from 'react';
import Card from 'react-bootstrap/Card';
import user from '../logo/user.png';
import trash from '../logo/trash.png';
import edit from '../logo/pencil.png';

function InterviewDetailCard() {
    return (
        <Card className='id-card' style={{display:'flex'}}>
            <img className='avatar' src={user} />
            <div className='user-card-row' style={{display:'flex'}}>
                <a className='userName'>Vrishabh Agamya</a>
                <a className='userEmail'>agamya.vrishabh@gmail.com</a>
            </div>
            <a style={{marginLeft:'460px', color:'#9b9b9b'}}>1:00 PM - 1:45 PM</a>
            <div className='delete-edit' style={{display:'flex', marginLeft:'500px'}}>
                <img className='delete-icon' style={{paddingRight:'40px'}} src={trash} />
                <img className='edit-icon' src={edit} />
            </div>
        </Card>
    )
}

export default InterviewDetailCard