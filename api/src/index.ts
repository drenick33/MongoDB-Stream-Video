import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import crypto from "crypto";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import videoRoutes from "./modules/video/routes";
import { connectToDB } from "./mongodb/mongo";
dotenv.config();

const app = express();
let gfs: Grid.Grid;
//Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

//Allow cross origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Let All Webpages access API
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //Tell Browsers what options are available
    return res.status(200).json({});
  }
  next();
});

app.use(cors());

connectToDB();

app.listen(process.env.DEV_PORT, () => {
  console.log(`Now listening on port ${process.env.DEV_PORT}`);
});

app.use("/video", videoRoutes);
