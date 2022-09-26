import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import share from '../../logo/share.png';
import group_logo from '../../logo/group.png';
import trash from '../../logo/trash.png';
import edit from '../../logo/pencil.png';
import moment from 'moment';
import {NavLink, Link} from 'react-router-dom';
import InterviewDetailCard from '../InterviewDetailCard';
import axios from 'axios';

function ScheduledInterviews(props) {
    const {item} = props;
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(item.id)
    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`http://localhost:8000/interviews/getInterviewDetails/${item.id}`).then(res=>{
    //       setInterviews(res.data.data);
    //       setLoading(false);
    //     }).catch(err=>{
    //       console.log(err);
    //       setLoading(false);
    //     })
    // }, []);

    return (
        <Card className="scheduled-interview-card">
            <div className="interview-header" style={{display:'flex'}}>
                <a className="interview-title">
                    {item.title}
                </a>
                <Link to={`/interview/${item.id}`}><img className="share-logo" src={share}></img></Link>
            </div>
            <div className="date-time" style={{display:'flex'}}>
                <a className="date">{item.date}</a>
            </div>
            {/* <div className='card-footer' style={{display:'flex'}}>
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
            </div> */}
        </Card>
    )
}

export default ScheduledInterviews