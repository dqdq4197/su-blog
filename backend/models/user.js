module.exports = (sequelize,DataTypes) => (
    sequelize.define('user', {
        email: {
            type:DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        nick: {
            type:DataTypes.STRING(15),
            allowNull: true,
            unique:true,
        },
        verify: {
            type:DataTypes.BOOLEAN,
        },
        key_verify: {
            type:DataTypes.STRING,
        },
        password: {
            type:DataTypes.STRING(100),
            allowNull:true,
        },
        provider: {
            type:DataTypes.STRING(10),
            allowNull:false,
            defaultValue:'local',
        },
        profile_img: {
            type:DataTypes.STRING(200),
            allowNull:true,
            defaultValue:'basic.png',
        },
        skills: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        intro: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        
    },{
        timestamps: true,
        paranoid:true,
    })
);