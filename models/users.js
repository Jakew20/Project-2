module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    usernamef: DataTypes.STRING,
    usernamel: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    movie1: DataTypes.STRING,
    movie2: DataTypes.STRING,
    movie3: DataTypes.STRING,
    movie4: DataTypes.STRING,
    movie5: DataTypes.STRING,
  });
  return user;
};
