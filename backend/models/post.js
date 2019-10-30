module.exports = (sequelize, DataTypes ) => (
    sequelize.define('post', {
        content: {
            type:DataTypes.STRING(140),
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