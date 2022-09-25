import React from 'react';
import Card from 'react-bootstrap/Card';
import user from '../logo/user.png';

function UserCard(props) {
    return (
        <Card className='user-card'>
            <div className='user-card-col' style={{display:'flex'}}>
                <img className='avatar' src={user} />
                <div className='user-card-row' style={{display:'flex'}}>
                    <a className='userName'>{props.userName}</a>
                    <a className='userEmail'>{props.email}</a>
                </div>
            </div> 
        </Card>
    )
}

export default UserCard