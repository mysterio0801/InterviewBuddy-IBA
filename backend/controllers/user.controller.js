const { user } = require('../database/init-db');

const getUserByEmail = async (req , res) => {
    try {
        const users = await user.findOne({where: {email: req.params.email , user_type: "CANDIDATE"}});
        res.status(200);
        return res.json({
            "message": "Data Fetched successfully!",
            "data": users
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "message": err
        })
    }
}

const getUsers = async (req , res) => {
    try {
        const users = await user.findAll()
        res.status(200);
        return res.json({
            "message": "Data Fetched successfully!",
            "data": users
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "message": err
        })
    }
}

module.exports = {getUserByEmail , getUsers}