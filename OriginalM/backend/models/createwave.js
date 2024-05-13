'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class createWave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  createWave.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'createWave',
  });
  return createWave;
};