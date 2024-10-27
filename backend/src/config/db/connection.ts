import { Dialect, Sequelize } from "sequelize";

const db_name = process.env.DATABASE_NAME as string;
const db_username = process.env.DATABASE_USERNAME as string;
const db_password = process.env.DATABASE_PASSWORD as string;
const db_host = process.env.DATABASE_HOST as string;
const db_port = process.env.DATABASE_PORT as string;
const db_dialect = process.env.DATABASE_DIALECT as Dialect;

const sequelize = new Sequelize(db_name, db_username, db_password, {
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
    console.log(err);
  });
export default sequelize;
