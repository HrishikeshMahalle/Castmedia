import React, { useContext, useEffect, useState } from "react";
import { Sectionbar } from "../../Utilities/SectionBar/sectionbar";
import { videos as Videox } from "../../backend/db/videos";
import "./styles/bottom.css";
import { GlobalContext } from "../../Context/GlobalState";

export const Bottom = () => {
  const [music, setMusic] = useState([]);
  const [tech, setTech] = useState([]);
  const {videos} = useContext(GlobalContext)

  useEffect(() => {
    setMusic([...Videox.filter((videos) => videos.category === "Music")]);
    setTech([...videos[0].filter((videos) => videos.category === "Tech")]);
    console.log("Rendered in Center");
  }, []);

  console.log("asli",videos[0])
  console.log("Non Use Effect",Videox)
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
