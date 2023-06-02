import videoData from "../data/videos.json";
import { error } from "next/dist/build/output/log";

const getCommonVideos = async (URL) => {
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    // const response = await fetch(
    //   `https://${BASE_URL}/${URL}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`
    // );
    // const data = await response.json();
    const data = videoData;
    if (data.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    console.log(data.items);
    return data.items.map((e) => {
      return {
        title: e.snippet.title,
        imgUrl: e.snippet.thumbnails.high.url,
        id: e.id.videoId || e.id.playlistId,
      };
    });
  } catch (e) {
    console.log("Something went wrong with video fetching, ", e);
  }
};

export default getCommonVideos;

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getCommonVideos(URL);
};
export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
