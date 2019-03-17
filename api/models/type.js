module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    'Type',
    {
      id: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT,
        required: true
      },
      description: {
        type: DataTypes.TEXT
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString()
      }
    },
    {
      tableName: 'type',
      timestamps: false
    }
  )

  return Type
}
