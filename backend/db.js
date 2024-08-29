import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mro.2019",
  database: "skillhub",
});

