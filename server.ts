import { NextFunction, Request, Response, } from "express";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { errors } from 'celebrate';

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: Error) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to bondo application." });
});

require("./app/routes/users.routes")(app);
require("./app/routes/groups.routes")(app);
app.use(errors());
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

