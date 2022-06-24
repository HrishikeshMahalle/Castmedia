import { useContext } from 'react'
import ReactPlayer from 'react-player'
import { GlobalContext } from '../../Context/GlobalState'

import './styles/headcarditem.css'

export default function HeadCardItem({_id,title,channel}) {

  const {setWallpaper,setChannelName,setHeadTitle} = useContext(GlobalContext)


  function clickHandler(obj) {
    setWallpaper(obj)
    setChannelName(channel)
    setHeadTitle(title)
  }

  return (
    <div className="head-card-item" onClick={e=>clickHandler(_id,title,channel)}>
        <span>{title}</span>
        <ReactPlayer className='react-player'
            url={`https://www.youtube.com/watch?v=${_id}`}
            loop={true}
            muted={true}
            playing={false}
            light={true}
            width='100%'
            height='100%'
        />
    </div>
  )
}
