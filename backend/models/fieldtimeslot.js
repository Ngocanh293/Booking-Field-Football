'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldTimeSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FieldTimeSlot.belongsTo(models.Field, { foreignKey: 'field_id' });
    }
  }
  FieldTimeSlot.init({
    field_id: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FieldTimeSlot',
  });
  return FieldTimeSlot;
};