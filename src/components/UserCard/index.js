import React from 'react';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import user from '../../logo/user.png';


function UserCard(props) {
    const navigate = useNavigate();
    const handleClick = (events) => {   
        console.log(props.user_type);
        localStorage.setItem("user_id", props.id);
        localStorage.setItem("user_type", props.user_type);
        navigate('/home');
        return;
    }
    return (
        <Card className='user-card' onClick = {handleClick}>
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