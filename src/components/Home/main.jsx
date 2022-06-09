import { React, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { ImVolumeMute2 } from "react-icons/im";
import { GoUnmute } from "react-icons/go";
import "./styles/main.css";
import { videos } from "../../backend/db/videos";
import { GlobalContext } from "../../Context/GlobalState";
import HeadCardItem from "../../Utilities/HeadCardItem/headcarditem";

export default function Main() {
  const [unmute, setUnmute] = useState(true);
  // const [trend, setTrend] = useState([]);

  const { wallpaper, headTitle, channelName } = useContext(GlobalContext);
  console.log("This is from main Page", wallpaper);

  const handleMute = (e) => {
    unmute ? setUnmute(false) : setUnmute(true);
  };

  // useEffect(() => {
  //   setTrend([
  //     ...videos.filter((videos) => videos.subCategory.includes("trending")),
  //   ]);
  //   console.log("Wow useEffect rendered");
  // }, []);

  // useEffect(()=>{
  //   (async ()=>{
  //    const data = await axios.get('/api/videos')
  //    setVideos([...data.data.videos])
  //   })()
  // },[])

  return (
    <div className="main">
      <div className="head-container">
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${wallpaper}`}
          loop={true}
          muted={unmute}
          playing={false}
          width="100%"
          pip={false}
          height="100%"
        />
        <div className="sideoverlay"> </div>

        <div className="bg-info-header">
          <h1>Trending This Week🔥</h1>
        </div>
        <div className="bg-info-content">
          <h3>{channelName}</h3>
        </div>
        <div className="bg-info-cat">
          <div className="text">{headTitle}</div>
        </div>
        <div className="sound">
          <button onClick={(e) => handleMute("HI")}>
            {unmute ? <ImVolumeMute2 /> : <GoUnmute />}
          </button>
        </div>
        <div className="head-cards">
          {videos.map((videos) =>
            videos.subCategory.includes("trending") ? (
              <HeadCardItem
                key={videos._id}
                _id={videos._id}
                title={videos.title}
                channel={videos.creator}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}
