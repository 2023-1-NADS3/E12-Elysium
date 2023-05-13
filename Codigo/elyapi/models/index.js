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

db.posts.belongsToMany(db.user,
  {through: 'creatorPost'}
  )

db.coments.belongsToMany(db.posts,
    {through: 'awserPost'}
    )

db.coments.belongsToMany(db.posts,
    {through: 'creatorComment'}
    )

module.exports = db;


