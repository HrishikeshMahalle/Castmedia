import React, { useEffect, useState } from "react";
import { Sectionbar } from "../../Utilities/SectionBar/sectionbar";
import { videos } from "../../backend/db/videos";
import "./styles/bottom.css";

export const Bottom = () => {
  const [music, setMusic] = useState([]);
  const [tech, setTech] = useState([]);

  useEffect(() => {
    setMusic([...videos.filter((videos) => videos.category === "Music")]);
    setTech([...videos.filter((videos) => videos.category === "Tech")]);
    console.log("Rendered in Center");
  }, []);
  return (
    <div className="bottom">
      <div className="head-cont-bot">
        <div className="center-header">
          <h1>Home</h1>
        </div>
        <Sectionbar title="Music" subTitle="Lighten the Mood" items={music} />
        <Sectionbar
          title="Technology"
          subTitle="Technology that channges"
          items={tech}
        />
      </div>
    </div>
  );
};
