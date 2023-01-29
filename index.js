import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authenticateToken from "./middleWare/authenticateToken.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

import postRoutes from "./routes/Post/posts.js";
app.use("/post", postRoutes);

import mongoose, { setDriver } from "mongoose";
mongoose.set("strictQuery", false);
const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connected to Mongoose, Server listening on port ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

export default app;
