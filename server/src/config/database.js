import { Sequelize } from "sequelize";

export const sequelize = new Sequelize (process.env.DB_NAME || "db_task", process.env.DB_USER || "root", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  });

  export const startDb = async () => {
    try {
        await sequelize.authenticate();
        //await sequelize.sync({ force: true});
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }