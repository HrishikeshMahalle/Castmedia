import { createContext, useState, useReducer } from "react";
// import { videos } from "../backend/db/videos";
import AppReducer from "./AppReducer";

export const GlobalContext = createContext(null);
const initialState = {
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

  const addToLikeList = (id) => {
    dispatch({
      type: "ADD_TO_LIKELIST",
      payload: id,
    });
  };
  const addToHistoryList = (id) => {
    dispatch({
      type: "ADD_TO_HISTORYLIST",
      payload: id,
    });
  };
  const addToWatchLater = (id) => {
    dispatch({
      type: "ADD_TO_WATCHLATER",
      payload: id,
    });
  };

  const removeFromLikes = (id) => {
    const likeRemove = state.likeList.filter((item) => item.id !== id);
    dispatch({
      type: "REM_FROM_LIKELIST",
      payload: likeRemove,
    });
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
