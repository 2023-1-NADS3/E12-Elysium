require('dotenv').config();
const { Sequelize } = require('sequelize');

//conexão sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })

// conexão mysql
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,        
//         }
//     }
//  });

sequelize.authenticate();

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User.model")(sequelize, Sequelize)
db.role = require("../models/role.model")(sequelize, Sequelize)//
db.posts = require("../models/posts.model")(sequelize, Sequelize)
db.coments = require("../models/coments.model")(sequelize, Sequelize)

db.user.hasMany(db.posts, {
  constraint: true,
  foreignKey: 'user_id',
  
})
db.user.hasMany(db.coments, {
  constraint: true,
  foreignKey: 'user_id',
})

db.posts.hasMany(db.coments, {
  constraint: true,
  foreignKey: 'post_id',
})

db.posts.belongsTo(db.user)
db.coments.belongsTo(db.user)
db.coments.belongsTo(db.posts)

module.exports = db;


