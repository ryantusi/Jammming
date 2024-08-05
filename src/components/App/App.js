import './App.css';
import Search from "../Search/Search";
import Tracks from "../Tracks/Tracks";
import Playlist from "../Playlist/Playlist";
import Add from "../Add/Add";
import React, { useState } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const getInput = (input) => {
    setSearchInput(input)
  };

  const [playlist, setPlaylist] = useState([]);
  const getPlaylist = (track) => {
    setPlaylist((prev) => {
      if(!prev.some(item => item.uri === track.uri)){
        return [...prev, track];
      } else {
        return prev;
      }
    });
  };
  const removeTrack = (track) => {
    setPlaylist((prev) => prev.filter((item) => JSON.stringify(item) !== JSON.stringify(track)));
  };

  return (
    <div className="App">
      <h1>Jammming - React App Powered by Spotify API</h1>
      <div className='content'>
        <Tracks input={searchInput} getPlaylist={getPlaylist} />
        <div className='inner-content'>
          <Search getInput={getInput} />
          <Add playlist={playlist} />
        </div>
        <Playlist tracks={playlist} removeTrack={removeTrack} />
      </div>
    </div>
  );
}

export default App;