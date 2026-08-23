'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.hasMany(models.FieldTimeSlot, { foreignKey: 'field_id' });
      Field.hasMany(models.Booking, { foreignKey: 'field_id' });
    }
  }
  Field.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    field_type: DataTypes.STRING,
    price_per_hour: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};