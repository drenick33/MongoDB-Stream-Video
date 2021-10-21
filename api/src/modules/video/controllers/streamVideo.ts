import { Request, Response } from "express";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { storage } from "../../../mongodb/mongo";
import fs from "fs";

//@TODO fix-bug stream-start greater than stream-end

const streamVideo = (req: Request, res: Response) => {
  const streamId: any = "617140633bcd4a93f08b545f";
  const streamName: string = "11607630c04a9d481ca01787d55d4913.mp4"; //hard coded for now, get dynamically later

  const gfs = Grid(mongoose.connection.db, mongoose.mongo);
  console.log(gfs);
  const range: any = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const db = mongoose.connection.db;

  //   GridFS Collection
  db.collection("videos.files").findOne({}, (err, video) => {
    if (!video) {
      console.log("no video");
      return res.status(404).send("No video uploaded!");
    }

    console.log(video);

    // Create response headers
    const videoSize = video.length;
    const start = Number(range.replace(/\D/g, ""));
    const end = videoSize - 1;

    const contentLength = end - start + 1;
    console.log(contentLength);
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    let filename = video.filename;
    console.log(filename);
    const gridFSBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      {
        bucketName: "videos",
      }
    );
    const readstream = gridFSBucket
      .openDownloadStreamByName(filename, { start })
      .pipe(res);

    //error handling, e.g. file does not exist
    readstream.on("error", function (err) {
      console.log("An error occurred!", err);
      throw err;
    });

    // When the stream is done being read, end the response
    readstream.on("close", () => {
      res.end();
    });

    // readstream.pipe(fs.createWriteStream('./output.mp4'));
    // Finally pipe video to response
    // stream.pipe(res);
    console.log("no errors");
  });
};

export default streamVideo;
