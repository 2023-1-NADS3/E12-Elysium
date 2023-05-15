const db = require('../models');
const Posts = db.Posts
const Users = db.Users

module.exports = (sequelize, Sequelize) => {
    const CreatorsPosts = sequelize.define("CreatorsPosts", {
    PostId: {
      type: Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'id'
      }
        },
    
    UserId: {
      type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
      }
    },
    },
      {
        timestamps: false,
      },
    );

  // associação da tabela usuario e post


  return CreatorsPosts;
};

