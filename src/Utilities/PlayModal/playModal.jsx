import React, { useContext } from "react";
import "./playModal.css";
import { GlobalContext } from "../../Context/GlobalState";
import { AiTwotoneDelete, AiFillCloseCircle } from "react-icons/ai";

export const PlayModal = ({ id }) => {
  const { playModalOpen, setPlayModalOpen, notes, setNotes } =
    useContext(GlobalContext);

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Math.round(Math.random() * 100),
      text: e.target.title.value,
      list: [],
    };
    setNotes([...notes, newNote]);
    e.target.note.value = "";
  };

  function showVids(ide) {
    notes.map((item) => {
      if (item.id === ide) {
        if (!item.list.includes(id)) {
          item.list.push(id);
          console.log("added ", id, "to ", item);
        }
        return ''
      } else {
        console.log("Failed to add into watchlist");
        return ''
      }
    });
  }

  function delItem(elemid) {
    setNotes(notes.filter((item) => item.id !== elemid));
    console.log("Deleted item from watchPlaylist notes");
  }

  return playModalOpen ? (
    <div className="modalbox">
      <div className="closeIcon" onClick={(e) => setPlayModalOpen(false)}>
        <AiFillCloseCircle />
      </div>
      <div className="playlists">
        {notes &&
          notes.map((item) => (
            <div
              className="playlist-item"
              key={item.id}
              onClick={(e) => showVids(item.id)}
            >
              <div className="del-icon" onClick={(e) => delItem(item.id)}>
                <AiTwotoneDelete />
              </div>
              {item.text}
            </div>
          ))}
      </div>
      <div className="create-playlists">
        <form onSubmit={addNote}>
          <input type="text" placeholder="Name of the Playlist" name="title" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};
