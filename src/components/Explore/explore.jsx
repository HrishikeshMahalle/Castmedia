import React, { useState, useEffect, useContext } from "react";
import Header from "../../Utilities/Header/header";
import Sidebar from "../../Utilities/Sidebar/sidebar";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { videos } from "../../backend/db/videos";

import ReactPlayer from "react-player";
import "./styles/explore.css";
import { GlobalContext } from "../../Context/GlobalState";
import { PlayModal } from "../../Utilities/PlayModal/playModal";
import { useAuth } from "../../Context/authcontext";

export default function Explore() {
  const { isUser } = useAuth();
  const {
    addToHistoryList,
    // historyList,
    // addToWatchList,
    addToLikeList,
    // watchList,
    // likeList,
    setPlayModalOpen,
    playModalOpen,
    removeFromLikes,
    addToWatchLater,
  } = useContext(GlobalContext);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [filterItem, setFilterItem] = useState([]);

  const vid = videos && videos.find((product) => product.id === id);

  const navigate = useNavigate();
  useEffect(() => {
    setItem({ ...vid });
    setFilterItem(
      videos.filter((product) => product.category === vid.category)
    );
  }, [vid]);

  function clickHandler(id) {
    navigate(`/video/${id}`);
    addToHistoryList(id);
  }
  function clickLikeButton(id) {
    addToLikeList(id);
  }
  function openWatchModal() {
    playModalOpen ? setPlayModalOpen(false) : setPlayModalOpen(true);
    console.log("Modal Opened");
  }

  function removedFrmLikes(id) {
    removeFromLikes(id);
    console.log(item);
  }
  console.log("CHecking form Explorer", isUser);
  // console.log("this is history list", historyList);
  // console.log("this is Watch list", watchList);
  // console.log("this is Like list", likeList);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="explore-cont">
        <div className="video-container">
          <div className="video-player">
            {isUser ? (
              <ReactPlayer
                className="react-player"
                url={`https://www.youtube.com/watch?v=${id}`}
                loop={false}
                muted={true}
                controls={true}
                playing={false}
                width="100%"
                pip={false}
                height="100%"
              />
            ) : (
              <h1>Please Login</h1>
            )}
          </div>
          <div className="video-info">
            <div className="vid-title">
              <span>{vid.title}</span>
              <PlayModal id={id} />
            </div>
            <div className="vid-info">
              <div className="vid-views">
                <div className="vid-views-num">{vid.views}</div>
                <div className="vid-date">{vid.createdAt}</div>
              </div>
              <div className="vid-btns">
                <div className="likebtn" onClick={(e) => clickLikeButton(id)}>
                  <AiFillLike />
                </div>
                <div className="unlikebtn" onClick={(e) => removedFrmLikes(id)}>
                  <AiFillDislike />
                </div>
                <div className="shareBtn" onClick={(e) => addToWatchLater(id)}>
                  <FaShare />
                </div>
                <div
                  className="addPlaylistBtn"
                  onClick={(e) => openWatchModal()}
                >
                  {" "}
                  <MdPlaylistAdd />
                </div>
              </div>
            </div>
            <div className="vid-desc">
              <div className="vid-channel-box">
                <div className="vid-channel-logo">
                  <img src={vid.creatorImg} alt={vid.creator} />
                </div>
                <div className="vid-channel-name">
                  <span>{vid.creator}</span>
                </div>
              </div>
              <div className="vid-subscribe-box">
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="video-sugg">
          <div className="video-sugg-item">
            <h3>Video Suggestion</h3>
          </div>
          {filterItem &&
            filterItem.map((video, key) => (
              <div
                className="video-sugg-item"
                key={key}
                onClick={(e) => clickHandler(video.id)}
              >
                <div className="video-sugg-vid">
                  <ReactPlayer
                    className="react-player"
                    url={`https://www.youtube.com/watch?v=${video.id}`}
                    loop={false}
                    muted={true}
                    light={true}
                    playing={false}
                    width="100%"
                    pip={false}
                    height="100%"
                  />
                </div>
                <div className="video-sug-des">
                  <div className="des-title">
                    <span>{video.title}</span>
                  </div>
                  <div className="des-channel">
                    <span>{video.creator}</span>
                  </div>
                  <div className="des-views">
                    <span>{video.likes}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
