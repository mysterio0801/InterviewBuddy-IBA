import React from "react";
import {
    AppBar,
    CreateInterviewCard,
    ScheduledInterviews,
    PastInterviewsCard
} from '../'
import Container from 'react-bootstrap/Container';
import interviewIcon from '../../logo/interview 1.png'

function Home() {
  return (
    <>
        <AppBar />
        <Container className="cont1">
            <div className="heading1" style={{display:'flex'}}>
                <img className="interviewLogo" src={interviewIcon} /> 
                Interview Creation Portal
            </div>
            <CreateInterviewCard />
        </Container>
        <Container className="cont1">
            <div className="heading2" style={{display:'flex'}}>
                Scheduled Interviews
            </div>
            <div className="scheduled-interviews" style={{display: 'flex'}}>
                <ScheduledInterviews />
                <ScheduledInterviews />
                <ScheduledInterviews />
            </div>
        </Container>
        <Container className="cont1">
            <div className="heading2" style={{display:'flex'}}>
                Past Interviews
            </div>
            <div className="scheduled-interviews" style={{display: 'flex'}}>
                <PastInterviewsCard />
            </div>
        </Container>
    </>
  )
}

export default Home