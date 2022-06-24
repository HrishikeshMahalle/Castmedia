import React, { useState, useEffect, useContext } from "react";

import { Sectionbar } from "../../Utilities/SectionBar/sectionbar";
// import { videos } from "../../backend/db/videos";
import "./styles/center.css";
import { GlobalContext } from "../../Context/GlobalState";

export default function Center() {
  const [games, setGames] = useState([]);
  const [news, setNews] = useState([]);
  const { videos } = useContext(GlobalContext);

  useEffect(() => {
    setGames([...videos[0].filter((videos) => videos.category === "Games")]);
    setNews([...videos[0].filter((videos) => videos.category === "News")]);
    console.log("Rendered in Center");
  }, []);
  return (
    <div className="center">
      <div className="head-cont-center">
        <div className="center-header">
          <h1>Home</h1>
        </div>
        <Sectionbar
          title="Esports"
          subTitle="The Best of ESPORTS"
          items={games}
        />
        <Sectionbar title="News" subTitle="Around the World" items={news} />
      </div>
    </div>
  );
}
