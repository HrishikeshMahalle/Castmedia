import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import "./sectionbar.css";
import { GlobalContext } from "../../Context/GlobalState";

export const Sectionbar = ({ title, subTitle, items }) => {
  const navigate = useNavigate();
  const { addToHistoryList } = useContext(GlobalContext);
  function clickHandle(id) {
    navigate(`/video/${id}`);
    addToHistoryList(id);
  }
  return (
    <div className="video-cont">
      <img
        className="video-cont-bg"
        src="https://wallpapertag.com/wallpaper/full/6/7/6/142905-widescreen-cool-background-designs-1920x1200-hd-1080p.jpg"
        alt="background"
      />
      <div className="video-items">
        <div className="video-item head">
          <h3>{title}</h3>
          <span>{subTitle}</span>
        </div>
        {items &&
          items.map((videos) => (
            <div
              className="video-item"
              key={videos.id}
              onClick={(e) => clickHandle(videos.id)}
            >
              <ReactPlayer
                className="react-player"
                url={`https://www.youtube.com/watch?v=${videos.id}`}
                loop={true}
                muted={true}
                light={true}
                playing={false}
                width="100%"
                height="100%"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
