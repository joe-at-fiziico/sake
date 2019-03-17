module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    'Record',
    {
      id: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      tid: {
        type: DataTypes.INTEGER,
        required: true
      },
      amount: {
        type: DataTypes.INTEGER,
        required: true
      },
      comment: {
        type: DataTypes.TEXT
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString()
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString()
      }
    },
    {
      tableName: 'record',
      timestamps: false
    }
  )

  // Record.associate = (models) => {
  //   models.Record.belongsTo(
  //     models.CreditPoolSeller,
  //     {
  //       as: 'reseller',
  //       foreignKey: 'resellerId'
  //     }
  //   )
  // }

  return Record
}
