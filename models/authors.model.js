module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
      bookid: {
        type: Sequelize.INTEGER,    
        allowNull: false
      },
      authorname: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },{
        timestamps: false,
        underscored: true
    });
  
    return Author;
  };