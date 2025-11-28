const { DataTypes } = require("sequelize")
const sequelize = require("../Config/database")

const User = sequelize.define("User", {
    userId: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    
    password : {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('Admin', 'Execuitve', 'Common' ),
        allowNull: false,
        defaultValue: 'common'
    }
})