import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const mongoURI: string = `mongodb+srv://drenick33:${process.env.DB_PASS}@cluster0.8cqou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const videoBucket: string = "videos";

export const connectToDB = () => {
  mongoose.connect(mongoURI);
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("connected to DB"));
};

export const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        if (!isVideoFile(file.mimetype)) {
          return reject("File isn't a video");
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: videoBucket,
        };
        resolve(fileInfo);
      });
    });
  },
});

const isVideoFile = (fileType: string): boolean =>
  //update depending on rquirements
  fileType === "video/mp4" ||
  fileType === "video/mkv" ||
  fileType === "video/avi";

export const videoUpload = multer({ storage });
