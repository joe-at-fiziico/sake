module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define(
    'Budget',
    {
      tid: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true
      },
      amount: {
        type: DataTypes.INTEGER,
        required: true
      },
      comment: {
        type: DataTypes.TEXT
      },
      monthly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'budget',
      timestamps: false
    }
  )

  return Budget
}
