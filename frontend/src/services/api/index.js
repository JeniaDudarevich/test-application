import axios from "axios";
import {
  UPLOAD_VIDEO_AXIOS_PATH,
  VIDEOS_LIST_AXIOS_PATH
} from "../../config/constants";

const Video = {
  getVideos: () => axios.get(VIDEOS_LIST_AXIOS_PATH)
    .then(({data: { videos }}) => videos),
  uploadVideo: (file, videoName) =>
    axios.post(UPLOAD_VIDEO_AXIOS_PATH, file, { params: { video_name: videoName }})
    .then(({data}) => data)
};

export default Video;
