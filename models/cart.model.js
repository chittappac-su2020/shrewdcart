module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      sellerid:{
        type: Sequelize.STRING,
        allowNull: false
      },
      buyerid: {
          type: Sequelize.STRING,
          allowNull: false
      },
      bookid: {
          type: Sequelize.INTEGER,
          allowNull:false
      }
    },{
        timestamps: true,
        underscored: true
    });
  
    return Cart;
  };