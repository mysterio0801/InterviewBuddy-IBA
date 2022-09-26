import React, {useState, useEffect} from 'react'
import {
    AdminHome,
    CandidateHome
} from '../../components';



const userTypes =  {
    Admin: "Admin",
    Candidate: "Candidate"
}

function Dashboard() {
    const [userType, setUserType] = useState(userTypes.Admin);
  return (
    <>
        {userType===userTypes.Admin ? <AdminHome /> : <CandidateHome/>}
    </>
  )
}

export default Dashboard