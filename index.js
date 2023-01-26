import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleWare/credentials.js";
import http from "http";
import verifyJWT from "./middleWare/verifyJWT.js";

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
app.use(verifyJWT);

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

export default (req, res) => {
  //set header first to allow request or origin domain (value can be different)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );

  //---- other code

  //Preflight CORS handler
  if (req.method === "OPTIONS") {
    return res.status(200).json({
      body: "OK",
    });
  }
};
