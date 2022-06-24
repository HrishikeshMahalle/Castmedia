import { createContext, useState, useReducer, useEffect } from "react";
// import { videos } from "../backend/db/videos";
import AppReducer from "./AppReducer";
import axios from "axios";
import { getAuthData } from "../Utilities/AuthUtil/authUtil";
import {
  addToUserLike,
  addToUserHistory,
  addToUserWatch,
  removeFrmUserLike,
} from "./ActionFunction";
import jwt_decode from "jwt-decode";

export const GlobalContext = createContext(null);
const initialState = {
  videos: [],
  likeList: [],
  historyList: [],
  watchLater: [],
};

export const GlobalProvider = ({ children }) => {
  const [wallpaper, setWallpaper] = useState("sMlER3GMR7c");
  const [headTitle, setHeadTitle] = useState("Riptide");
  const [channelName, setChannelName] = useState("The Chainsmokers");
  const [notes, setNotes] = useState([]);
  const [playModalOpen, setPlayModalOpen] = useState(false);

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [videoss, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: videos } = await axios.get("/api/videos");
        dispatch({
          type: "INITIAL_VIDEOS",
          payload: [...videos.videos],
        });
      } catch (err) {
        console.error("im from useEffect", err.message);
      }
    })();
  }, []);

  const encodedToken = getAuthData();
  const checkLike = async () => {
    try {
      const resp = await axios
        .get("/api/user/likes", {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        })
        .then((respo) => console.log(respo));
      console.log(resp.data);
    } catch (err) {
      console.error("im from useEffect", err.message);
    }
  };



  const addToLikeList = (id) => {
    dispatch({
      type: "ADD_TO_LIKELIST",
      payload: id,
    });
    const resp = addToUserLike(id, encodedToken);
    resp === "undefined"
      ? console.log("Not added in like")
      : console.log("LIked the Video but", videoss);

    checkLike();
  };
  const addToHistoryList = (id) => {
    dispatch({
      type: "ADD_TO_HISTORYLIST",
      payload: id,
    });
    const resp = addToUserHistory(id, encodedToken);
    resp === "undefined"
      ? console.log("Not added in history")
      : console.log("History the Video but", videoss);
  };
  const addToWatchLater = (id) => {
    dispatch({
      type: "ADD_TO_WATCHLATER",
      payload: id,
    });
    const resp = addToUserWatch(id, encodedToken);
    resp === "undefined"
      ? console.log("Not added in WatchLater")
      : console.log("LIked the Video but", videoss);
  };

  const removeFromLikes = (id) => {
    const likeRemove = state.likeList.filter((item) => item.id !== id);
    dispatch({
      type: "REM_FROM_LIKELIST",
      payload: likeRemove,
    });
    const resp = removeFrmUserLike(id, encodedToken);
    console.log("im fom rem like", resp);
  };
  const removeFromHistory = (id) => {
    const hisRemove = state.historyList.filter((item) => item.id !== id);
    dispatch({
      type: "REM_FROM_HISTORYLIST",
      payload: hisRemove,
    });
  };
  const removeFromWatch = (id) => {
    const watchRemove = state.watchLater.filter((item) => item.id !== id);
    dispatch({
      type: "REM_FROM_HISTORYLIST",
      payload: watchRemove,
    });
  };

  const value = {
    wallpaper,
    setWallpaper,
    headTitle,
    setHeadTitle,
    channelName,
    setChannelName,
    addToHistoryList,
    addToLikeList,
    addToWatchLater,
    encodedToken,
    videos: [state.videos],
    watchLater: [state.watchLater],
    historyList: [state.historyList],
    likeList: [state.likeList],

    playModalOpen,
    setPlayModalOpen,
    notes,
    setNotes,
    removeFromHistory,
    removeFromLikes,
    removeFromWatch,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
