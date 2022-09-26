const { user } = require("../database/init-db")

const authUser = async (req , res , next) => {
    const user_obj = await user.findOne({where: {id: req.body.user_id}});
    if (user_obj.user_type === "INTERVIEWER"){
        next()
    } else if(user_obj.user_type === "CANDIDATE"){
        res.status(401);
        return res.json({
            "message": "Candidates aren't allowed to access this route."
        })
    }
}

module.exports = {authUser}