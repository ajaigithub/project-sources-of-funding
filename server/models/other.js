' use strict';
module.exports = (sequelize, DataTypes) => {
  var Othercontrib = sequelize.define('Othercontrib', {
  
    name:
      DataTypes.STRING,
    description:DataTypes.STRING

    ,
    amount: DataTypes.INTEGER
    ,
    
    
  });


  return Othercontrib;
};