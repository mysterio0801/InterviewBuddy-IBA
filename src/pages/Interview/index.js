import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {
  AppBar,
  InterviewDetailCard
} from '../../components';
import calendar from '../../logo/calendar.png';
import {useParams} from 'react-router-dom';


function Interview(props) {
  const { id }= useParams();
  const [loading,setLoading] = useState(true);
  const [Data,setData] = useState({});
  // const user_id = localStorage.getItem(user_id);
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/interviews/getInterviewDetails/${id}`).then((response) => {
            const resdata = response.data;
            setData(resdata);
            setLoading(false);
            console.log(Data);
        });
  }, []);
  return (
    <>
        <AppBar />
        {!loading &&
          <> 
            <div className='id-header' style={{display:'flex'}}>
                <a className='heading1'>{Data.data.title}</a>
                <div style={{display:'flex', flexDirection:'row', width:'130px', justifyContent:'space-between', alignItems:'center'}}>
                    <img src={calendar} className='edit-icon'/>
                    <a className='date-id'>{Data.data.date}</a>
                </div>
            </div>
            <div className='id-body' style={{display:'flex'}}>
                <a className='heading1'>Participants</a>
                <InterviewDetailCard sessionID = {id} participants = {Data.participants} />
            </div>
          </>
      }
    </>
  )
}

export default Interview