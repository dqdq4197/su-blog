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
            defaultValue:'heesu1'
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
        }
    },{
        timestamps: true,
        paranoid:true,
    })
);