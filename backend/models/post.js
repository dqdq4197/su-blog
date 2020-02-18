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
        },
        tumnailTitle: {
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        hashTags: {
            type:DataTypes.STRING(150),
            allowNull:true,
        },
        skills: {
            type:DataTypes.STRING(150),
            allowNull:false,
        },
        tumnailImg: {
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        isHide: {
            type:DataTypes.BOOLEAN,
            allowNull:true,
        },
    },{
        timestemps:true,
        paranoid:true,
    })
);