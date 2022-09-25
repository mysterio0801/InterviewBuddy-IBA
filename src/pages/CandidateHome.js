import React from 'react';
import AppBar from "../components/AppBar";
import Container from 'react-bootstrap/Container';
import ScheduledInterviews from "../components/ScheduledInterviewCard";
import PastInterviewsCard from "../components/PastInterviewsCard";

function CandidateHome() {
    const userType = 'Candidate'
    return (
        <>
            <AppBar />
            <Container className="cont1">
                <div className="heading2" style={{display:'flex'}}>
                    Scheduled Interviews
                </div>
                <div className="scheduled-interviews" style={{display: 'flex'}}>
                    <ScheduledInterviews userType={userType} />
                    <ScheduledInterviews userType={userType} />
                    <ScheduledInterviews userType={userType} />
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

export default CandidateHome