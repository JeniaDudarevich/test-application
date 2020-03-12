import VideoStore from "../stores/video";
import axios from "axios";
import { observe } from "mobx";
import _ from "lodash";

describe("VideoStore", () => {
  let videoStore;

  it('makes videos observable', () => {
    videoStore = VideoStore;
    let isObserved = false;
    observe(videoStore, (changes) => {
      isObserved = true;
    });
    videoStore.videos = [];
    expect(isObserved).toBeTruthy();
  });

  it('makes loading observable', () => {
    videoStore = VideoStore;
    let isObserved = false;
    observe(videoStore, () => {
      isObserved = true;
      videoStore.loading = {
        gettingVideos: false
      };
      expect(isObserved).toBeTruthy();
    });
  });

  describe('actions', () => {
    let promiseHelper;

    beforeEach(() => {
      const fakePromise = new Promise((resolve, reject) => {
        promiseHelper = {
          resolve: resolve
        };
      });
      spyOn(axios, "get").and.returnValue(fakePromise);
      spyOn(axios, "post").and.returnValue(fakePromise);
    });

    describe(".loadVideos", () => {

      it('fetch the list of videos', () => {
        videoStore = VideoStore;
        videoStore.loadVideos();
        const url = `/videos`;
        expect(axios.get).toHaveBeenCalledWith(url);
      });

      describe('when fetch is successful', () => {

        it('assigns the response from the api to the store videos', () => {
          videoStore = VideoStore;
          videoStore.loadVideos();
          const data = [
            {
              id: 1,
              name: "test_video.mp4",
              video_name: "Test video title",
              link: "/uploads/test_video.mp4"
            }
          ];
          promiseHelper.resolve({ data: data });
          _.defer(() => {
            expect(videoStore.videos).toEqual(data);
            done();
          });
        });
      });

      it('upload video file', () => {
        videoStore = VideoStore;
        videoStore.uploadVideo();
        expect(axios.post).toHaveBeenCalled();
      });
    });
  });

});
