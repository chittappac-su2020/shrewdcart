module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      ISBN: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicationdate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
          type: Sequelize.DOUBLE,
          allowNull: false
      },
      sellername: {
          type: Sequelize.STRING,
          allowNull:false
      }
    },{
        timestamps: true,
        underscored: true
    });
  
    return Book;
  };