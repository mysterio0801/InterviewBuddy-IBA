import React from 'react'
import AppBar from "../components/AppBar";
import Container from 'react-bootstrap/Container';
import PastInterviewsCard from "../components/PastInterviewsCard";
import UserCard from '../components/UserCard';

function HomePage() {
    const userName = '';
    const email = '';
    return (
        <>
            <AppBar />
            <Container className="cont1">
                <div className="heading2" style={{display:'flex'}}>
                    Admins
                </div>
                <div className="scheduled-interviews" style={{display: 'flex'}}>
                    <UserCard userName='Vrishabh Agamya' email='agamya.vrishabh@scaler.com'/>
                    <UserCard userName='Tanish Agarwal' email='agarwal.tanish@scaler.com'/>
                    <UserCard userName='Himanshu Vishwakarma' email='himanshu.vishwakarma@scaler.com'/>
                </div>
            </Container>
            <Container className="cont1">
                <div className="heading2" style={{display:'flex'}}>
                    Candidates
                </div>
                <div className="scheduled-interviews" style={{display: 'flex'}}>
                    <UserCard userName='Candidate 1' email='candidate1@gmail.com'/>
                    <UserCard userName='Candidate 2' email='candidate2@gmail.com'/>
                    <UserCard userName='Candidate 3' email='candidate3@gmail.com'/>
                </div>
            </Container>
        </>
    )
}

export default HomePage