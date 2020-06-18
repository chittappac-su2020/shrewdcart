module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
      title: {
        type: Sequelize.STRING,    
        allowNull: false
      },
      sellername: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bookid: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    },{
        timestamps: false,
        underscored: true
    });
  
    return Image;
  };