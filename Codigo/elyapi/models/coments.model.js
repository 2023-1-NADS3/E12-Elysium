module.exports = (sequilize, Sequelize) => {
    const Coments = sequilize.define("coments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coment: {
            type: Sequelize.STRING,
            require: true
        },
        like: {
            type: Sequelize.INTEGER,
        },
    },
        {
            timestamp: true,
        }
    )

    return Coments
}