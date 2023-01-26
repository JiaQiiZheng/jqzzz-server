import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleWare/credentials.js";
import http from "http";
import verifyJWT from "./middleware/verifyJWT.js";

const app = express();
app.use(credentials);
app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import homeRouter from "./routes/home.js";
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/", homeRouter);
// app.use(verifyJWT);

import mongoose, { setDriver } from "mongoose";
mongoose.set("strictQuery", false);
const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Connected to Mongoose, Server listening on port ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

export default server;
