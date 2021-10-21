import { Router } from "express";
import streamVideo from "./controllers/streamVideo";
import postVideo from "./controllers/postVideo";
import { videoUpload } from "../../mongodb/mongo";

const router = Router();

//Get Methods
router.get("/", streamVideo);

// //Post methods
router.post("/", videoUpload.single("videoFile"), postVideo);
// //Patch methods
// router.patch('/:storyId', editStory);
//Delete methods

export default router;
