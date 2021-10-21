import { Request, Response } from "express";

const mongoose = require("mongoose");
import Video from "../model";

const postVideo = (req: Request, res: Response) => {
  //@TODO store video information in Schema

  try {
    console.log(req.file);
    console.log("in post Video");
    return res.status(200).json({ message: "postVideo Works" });
  } catch (error) {
    return res.status(500).json({ message: "postVideo Failed", error });
  }

  // const video = new Video({
  //   _id: new mongoose.Types.ObjectId(),
  //   fileId: req.body.fileId,
  //   title: req.body.title,
  //   company: req.body.company,
  //   product: req.body.product,
  //   length: req.body.length,
  //   skipTimer: req.body.skipTimer,
  //   coinValue: req?.body?.coinValue,
  //   tags: req.body.tags,
  // });
  // video
  //   .save()
  //   .then((result: any) => {
  //     console.log(result);
  //     res.status(201).json({
  //       message: "Video Added!",
  //       story: video,
  //     });
  //   })
  //   .catch((error: any) => {
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Add Video Failed",
  //       error: error,
  //     });
  //   });
};

export default postVideo;
