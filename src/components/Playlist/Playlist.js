import React from "react";
import "./Playlist.css";

function Playlist(props){
    const tracks = props.tracks;
    const handleClick = (track) => {
        props.removeTrack(track);
    };

    return (
        <div className="playlist">
            <div><b>Modify your Playlist</b><hr></hr></div>
            {
                tracks.length > 0 ? 
                    tracks.map(track => {
                        return (
                            <div key={track.uri} className="item">
                                <img src={track.photo} width={60} height={60} alt={track.name} />
                                <p><b>{track.name}</b></p>
                                <p>By - {track.artists}</p>
                                <button onClick={() => handleClick(track)}>-</button>
                            </div>
                        )
                    })
                : (<div><i>Nothing to show</i></div>)
            }
        </div>
    );
}

export default Playlist;
