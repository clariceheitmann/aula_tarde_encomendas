const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('Carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    peso:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    volume:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    codigoRastreio:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codMotorista',
            model: 'motoristas'
        }
    },
},{
    timestamps: false,
    tableName: 'cargas'
})

module.exports = Carga