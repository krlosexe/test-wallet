'use strict';
module.exports = (sequelize, DataTypes) => {
  const Billetera = sequelize.define('wallet', {
    confirma_token: DataTypes.STRING,
    saldo: DataTypes.DECIMAL(10, 2)
  }, {});
  Billetera.associate = function(models) {

   // Billetera.belongsTo(models.Cliente)
  };
  return Billetera;
};
