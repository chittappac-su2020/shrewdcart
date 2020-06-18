const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
let sequelize;

if (process.env.APPLICATION_ENV === 'prod') {
  sequelize = new Sequelize(process.env.RDS_DATABASE_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
    });
}else{

   sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    define:{
      timestamps: true
    },
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
}



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.author = require("./authors.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);
db.image = require("./image.model")(sequelize,Sequelize);

// db.books.hasMany(db.author, { as: "authors"});
// db.author.belongsTo(db.books, {
//   foreignKey : "bookid",
//   as : "book"
// });

module.exports = db;