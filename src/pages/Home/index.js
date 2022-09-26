import React, {useEffect, useState} from 'react'
import {
    AppBar,
    UserCard
} from '../../components';
import Container from 'react-bootstrap/Container';
import axios from "axios";

function Home() {
    const [adminList, setAdminList] = useState([]);
    const [candidateList, setCandidateList] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/users/getUsers/').then((response) => {
            const data = response.data.data;
            const admins = data.filter(item=>{
                return item.user_type==='INTERVIEWER';
            })
            const candidates = data.filter(item=>{
                return item.user_type==='CANDIDATE';
            })
            setAdminList(admins);
            setCandidateList(candidates);
        });
    },[]);

    const Admins = () =>{
        return(
            <>
                {
                    adminList.map(item=>{
                        return(
                            <UserCard user_type = {item.user_type} id = {item.id} userName={item.name} email={item.email}/>
                        )
                    })
                }
            </>
        )
    }

    const Candidates = () => {
        return(
            <>
                {
                    candidateList.map(item=>{
                        return(
                            <UserCard user_type = {item.user_type} id = {item.id} userName={item.name} email={item.email}/>
                        )
                    })
                }
            </>
        )
    }

    return (
        <>
            <AppBar />
            <Container className="cont1">
                <div className="heading2" style={{display:'flex'}}>
                    Admins
                </div>
                <div className="scheduled-interviews" style={{display: 'flex'}}>
                    {Admins()}
                </div>
            </Container>
            <Container className="cont1">
                <div className="heading2" style={{display:'flex'}}>
                    Candidates
                </div>
                <div className="scheduled-interviews" style={{display: 'flex'}}>
                    {Candidates()}
                </div>
            </Container>
        </>
    )
}

export default Home