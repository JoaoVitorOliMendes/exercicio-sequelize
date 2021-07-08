const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const fs = require("fs");
const path = require("path");

const conn = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});

conn.authenticate()
    .then(async () => {
        const dir = path.resolve(__dirname, "script.sql");
        const sqlCommand = fs.readFileSync(dir).toString("ascii");

        conn.query(sqlCommand);
        await start();
    });



const model = conn.define("UserModel", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    born_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, {
    timestamps: false,
    tableName: "usuario",
    underscored: true
}); 



const find = async () => {
    return await model.findAll();
}

const create = async (user) => {
    model.create(user)
}

const findByPk = async (id) => {
    return await model.findByPk(id)
}

const update = async (pk, user) => {
    const model = await findByPk(pk)
    await model.update(user)
}

const deleteById = async (pk) => {
    const model = await findByPk(pk)
    await model.destroy()
    return await find()
}



const start = async () => {
    user = {
        name: "Joao",
        born_date: "2003-11-10T03:00:00.000Z"
    }

    // create(user);

    // update(1, user);
    
    // console.info(destroy);

    // const singleUser = await findByPk(1)
    // console.info(singleUser); 

    // const allUsers = await find();
    // console.info(allUsers); 
}




/** Grupo
 * @JoaoVitorDeOliveiraMendes
 * @PetronioFaleixo
 * @AndreCalebe
 */