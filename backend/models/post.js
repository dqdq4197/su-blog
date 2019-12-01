module.exports = (sequelize, DataTypes ) => (
    sequelize.define('post', {
        content: {
            type:DataTypes.JSON,
            allowNull: false,
        },
        img: {
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        author: {
            type:DataTypes.STRING(15),
            allowNull:false,
        }
    },{
        timestemps:true,
        paranoid:true,
    })
);