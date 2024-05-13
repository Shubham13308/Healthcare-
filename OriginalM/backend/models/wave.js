'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wave extends Model {
    
    static associate(models) {
      
    }
  }
  wave.init({
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wave',
  });
  return wave;
};