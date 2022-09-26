const { interview, user, sequelize} = require('../database/init-db');

const timingClashVerdict = async (id , start_epoch , end_epoch) => {
    var flag = 0;
    var clash_data;
    const user_interviews = await user.findOne({where: {id: id} , include: interview});
    var interviews_list = user_interviews.dataValues.Interviews;
    for (let interview of interviews_list){
        const scheduled_start_time = interview.dataValues.interview_people.start_time;
        const scheduled_end_time = interview.dataValues.interview_people.end_time;
        if (start_epoch >= scheduled_start_time && start_epoch < scheduled_end_time){
            flag = 1;
            clash_data = interview;
            break;
        } else if (end_epoch > scheduled_start_time && end_epoch < scheduled_end_time){
            flag = 1;
            clash_data = interview;
            break;
        } else if (start_epoch <= scheduled_start_time && end_epoch >= scheduled_end_time){
            flag = 1;
            clash_data = interview;
            break;
        }
    }
    if(flag === 1){
        return {verdict: false , data: clash_data};
    } else {
        return {verdict: true , data: null};
    }
}

const getInterviews = async (req , res) => {
    const user_id = req.params.user_id;
    const requester_obj = await user.findOne({where: {id: user_id}});
    if(requester_obj.user_type === "INTERVIEWER"){
        try {
            const interviews = await interview.findAll({where: {created_by_user: user_id}} , {include: user});
            // const participants = await interviews.getUsers();
            // console.log(participants);
            res.status(200);
            return res.json({
                "message": "Data Fetched successfully!",
                "data": interviews
                // "participants": 
            });
        } catch (err) {
            res.status(500);
            return res.json({
                "message": err
            });
        }
    } else if (requester_obj.user_type === "CANDIDATE"){
        try {
            const interviews = await requester_obj.getInterviews();
            res.status(200);
            return res.json({
                "message": "Data Fetched successfully!",
                "data": interviews
            });
        } catch (err) {
            res.status(500);
            return res.json({
                "message": err
            });
        }
    }
}

const getInterviewDetails = async (req , res) => {
    const interview_id = req.params.interview_id;
    try {
        const interview_details = await interview.findOne({where: {id: interview_id}} , {include: user});
        const users = await interview_details.getUsers();
        res.status(200);
        return res.json({
            "message": "Data Fetched successfully!",
            "data": interview_details,
            "participants": users
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "message": err
        });
    }
}

const addInterviewSession = async (req , res) => {
    try {
        const title = req.body.title;
        const sessionDate = req.body.date;
        const creator_id = req.body.user_id;
        const requester_obj = await user.findOne({where: {id: creator_id}});
        const participants_data = req.body.participants;
        if(requester_obj.user_type === "CANDIDATE"){
            res.status(401);
            return res.json({
                "message": "Candidates aren't authorized to create interviews!"
            })
        }
        for(let participant of participants_data) {
            var start_time_epoch = new Date(sessionDate + "T" + participant.start_time).getTime();
            var end_time_epoch = new Date(sessionDate + "T" + participant.end_time).getTime();
            if(start_time_epoch >= end_time_epoch) {
                res.status(400);
                return res.json({
                    "message": "Can't schedule an interview in past",
                    "data": participant
                })
            }
            const clash_verdict = await timingClashVerdict(participant.id , start_time_epoch , end_time_epoch)
            if (!clash_verdict.verdict) {
                res.status(400);
                return res.json({
                    "message": "Interview timings are clashing!",
                    "data": clash_verdict.data
                })
            }
        }
        const interview_created = await interview.create({ title: title , date: sessionDate , created_by_user: creator_id});
        participants_data.forEach(async (interviewee_data) => {
            const interviewee = await user.findOne({where: {id: interviewee_data.id}});
            var start_time_epoch = new Date(sessionDate + "T" + interviewee_data.start_time).getTime();
            var end_time_epoch = new Date(sessionDate + "T" + interviewee_data.end_time).getTime();
            interview_created.addUser(interviewee , {through: {start_time:  start_time_epoch, end_time: end_time_epoch}});
        })
        
        res.status(200);
        return res.json({
            "message": "Interview Session created successfully!",
            "session": interview_created
        })
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            "error": err
        })
    }
}

const editInterview = async (req , res) => {
    try {
        const interview_id = req.params.id;
        const user_id = req.body.user_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
        const existing_interview = await interview.findOne({where: {id: interview_id}} , {include: user});
        const interview_date = existing_interview.date;
        const existing_participants = await existing_interview.getUsers();
        existing_participants.forEach(async (participant) => {
            if(user_id === participant.dataValues.id){
                const interviewee = await user.findOne({where: {id: participant.dataValues.id}});
                console.log(interviewee);
                var start_time_epoch = new Date(interview_date + "T" + start_time).getTime();
                var end_time_epoch = new Date(interview_date + "T" + end_time).getTime();
                await existing_interview.addUser(interviewee , {through: {start_time:  start_time_epoch, end_time: end_time_epoch}})
            }
        })
        res.status(200);
        return res.json({
            "message": "Interview edited successfully!"
        })
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            "error": err
        })
    }
}

const deleteInterview = async (req , res) => {
    try {
        const interview_id = req.body.interview_id;
        const participant_id = req.body.participant_id;
        const existing_interview = await interview.findOne({where: {id: interview_id}} , {include: user});
        const existing_users = await existing_interview.getUsers();
        for(let user of existing_users){
            if(participant_id === user.dataValues.id){
                start_time = user.dataValues.interview_people.start_time;
                end_time = user.dataValues.interview_people.end_time;
                await sequelize.query(`DELETE FROM interview_people WHERE UserId = ${participant_id} AND InterviewId = ${interview_id} AND start_time = ${start_time} AND end_time = ${end_time}`);
                res.status(204);
                return res.json({
                    "message": "Interview Session deleted successfully!",
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            "error": err
        })
    }
}

module.exports = { getInterviews , getInterviewDetails , addInterviewSession , editInterview , deleteInterview }