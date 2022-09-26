module.exports = (sequelize , DataTypes) => {
    const interview = sequelize.define('Interview' , {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    });
    
    return interview;
};