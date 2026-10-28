const Motorista = require('./Motorista')
const Carga = require('./Carga')
const Entrega = require('./Entrega')

Motorista.hasMany(Carga,{
    foreignKey: 'idMotorista',
    as: 'cargasMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista,{
    foreignKey: 'idMotorista',
    as: 'motoristaCarga',
    allowNull: false
})

Carga.hasMany(Entrega,{
    foreignKey: 'idCarga',
    as: 'entregaCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga,{
    foreignKey: 'idCarga',
    as: 'cargasEntrega',
    allowNull: false
})

module.exports = {Motorista, Carga, Entrega}