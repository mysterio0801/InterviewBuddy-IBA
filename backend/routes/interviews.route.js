const express = require('express');
const {  getInterviews , getInterviewDetails , addInterviewSession , editInterview, deleteInterview } = require('../controllers/interview.controller');
const { authUser } = require('../middlewares/authorize.middleware');
const router = express.Router();

router.get('/getInterviews/:user_id' , getInterviews);
router.get('/getInterviewDetails/:interview_id' , getInterviewDetails);
router.post('/addInterviewSession' , authUser , addInterviewSession);
router.put('/editInterview/:id' , editInterview);
router.delete('/deleteInterview' , deleteInterview);

module.exports = router;