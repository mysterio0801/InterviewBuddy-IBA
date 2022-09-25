import React from 'react';
import Container from 'react-bootstrap/Container';
import {
    AppBar, 
    ScheduledInterviews, 
    PastInterviewsCard
} from '../';

function CandidateHome() {
    const userType = 'Candidate'
    return (
        <>
            <AppBar/>
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