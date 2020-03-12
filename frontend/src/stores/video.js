import { action, decorate, observable } from "mobx";
import VideoService from "../services/api";
import { message } from "antd";

class VideoStore {
  videos = [];

  loading = {
    gettingVideos: false,
    uploadingVideo: false
  };

  loadVideos() {
    this.loading.gettingVideos = true;
    VideoService.getVideos()
      .then(data => this.videos = data)
      .catch(error => message.error(`Error: ${error}`))
      .finally(() => this.loading.gettingVideos = false);
  }

  uploadVideo(files, videoName) {
    const formData = new FormData();
    formData.append('file', files);
    this.loading.uploadingVideo = true;
    return VideoService.uploadVideo(formData, videoName)
      .then(data => message.success(data.message))
      .catch(error => message.error(`Error: ${error}`))
      .finally(() => this.loading.uploadingVideo = false);
  }
}

const DecoratedStore = decorate(VideoStore, {
  videos: observable,
  loading: observable,
  loadVideos: action,
  uploadVideo: action
});

export default new DecoratedStore();
