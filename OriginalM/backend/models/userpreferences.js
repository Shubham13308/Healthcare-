// model
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userpreferences extends Model {
    static associate(models) {
      // define association here
    }
  }
  userpreferences.init({
    userId: DataTypes.INTEGER,
    languages: DataTypes.STRING,
    breakfast: DataTypes.STRING,
    lunch: DataTypes.STRING,
    dinner: DataTypes.STRING,
    waketime: DataTypes.STRING,
    bedtime: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    bloodGlucose: DataTypes.STRING,
    bloodPressure: DataTypes.STRING,
    Cholestrol: DataTypes.STRING,
    distance: DataTypes.STRING,
    communication: DataTypes.JSON // Use DataTypes.JSON here
  }, {
    sequelize,
    modelName: 'userpreferences',
  });
  return userpreferences;
};
