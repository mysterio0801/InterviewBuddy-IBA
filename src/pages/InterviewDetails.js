import React from 'react';
import AppBar from '../components/AppBar';
import InterviewDetailCard from '../components/InterviewDetailCard';
import calendar from '../logo/calendar.png';
function InterviewDetails() {
  return (
    <>
        <AppBar />
        <div className='id-header' style={{display:'flex'}}>
            <a className='heading1'>Interview Title</a>
            <div style={{display:'flex', flexDirection:'row', width:'130px', justifyContent:'space-between', alignItems:'center'}}>
                <img src={calendar} className='edit-icon'/>
                <a className='date-id'>25/09/2022</a>
            </div>
        </div>
        <div className='id-body' style={{display:'flex'}}>
            <a className='heading1'>Participants</a>
            <InterviewDetailCard />
        </div>
    </>
  )
}

export default InterviewDetails