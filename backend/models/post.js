module.exports = (sequelize, DataTypes ) => (
    sequelize.define('post', {
        content: {
            type:DataTypes.JSON,
            allowNull: false,
        },
        img: {
            type:DataTypes.STRING(200),
            allowNull:true,
        }
    },{
        timestemps:true,
        paranoid:true,
    })
);