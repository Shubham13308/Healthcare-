'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userInfo.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    socialSecurity: DataTypes.INTEGER,
    addressOne: DataTypes.STRING,
    addressTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.STRING,
    martialStatus: DataTypes.STRING,
    social: DataTypes.STRING,
    kids: DataTypes.STRING,
    status: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'userInfo',
  });
  return userInfo;
};

//  npx sequelize-cli model:generate --name friend --attributes   userId:integer,fullName:string,email:string,message:string,status:string
//  npx sequelize-cli db:migrate

// npx sequelize-cli model:generate --name createWave --attributes name:string,userId:integer,message:string,image:string
