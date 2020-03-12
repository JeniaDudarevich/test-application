const express = require("express");
const router = express.Router();
const mongoDB = require("mongodb");
const constants = require("../config/constants");

const mongoClient = mongoDB.MongoClient;
const dbUrl = `mongodb://localhost:27017`;

router.post(constants.UPLOAD_VIDEO_PATH, (request, response) => {
  const videoName = request.query.video_name;
  const video = request.files.file;
  video.mv('./uploads/' + video.name);
  insertFile(video, videoName, response);
});

router.get(constants.VIDEOS_LIST_PATH, (request, response) => {
  getFiles(response);
});


function insertFile(video, videoName, response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true }, (error, client) => {
    let db = client.db("videosDatabase");
    let collection = db.collection("videos");
    if (error) {
      return error;
    } else {
      const file = {
        name: video.name,
        video_name: videoName,
        link: `uploads/${video.name}`
      };
      try {
        collection.insertOne(file);
      } catch (error) {
        console.log("Error while inserting", error);
      }
      response.json({message: "Video has been uploaded successfully"});
      client.close();
    }
  });
}

function getFiles(response) {
  mongoClient.connect(dbUrl,
    { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return error;
    } else {
      let db = client.db("videosDatabase");
      let collection = db.collection("videos");
      collection.find({}).toArray((error, videos) => {
        if (error) {
          response.send(error);
        }
        response.json({videos: videos});
        client.close();
      });
    }
  })
}

module.exports = router;
