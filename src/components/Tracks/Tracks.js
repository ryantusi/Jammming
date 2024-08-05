import React, { useEffect, useState } from "react";
import { search } from "../../helpers/spotify";
import "./Tracks.css";

function Tracks(props){
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            if (props.input){
                const result = await search(props.input);
                setTracks(result);
            }
        }

        fetchTracks();
    }, [props.input]);

    const handleClick = (track) => {
        props.getPlaylist(track);
    };

    return (
        <div className="tracks">
            <div><b>Search Results</b><hr></hr></div>
            {
                tracks.length > 0 ?
                    tracks.map(track => {
                        return (
                            <div key={track.uri} className="track">
                                <img src={track.photo} width={60} height={60} alt={track.name} />
                                <b>{track.name}</b>
                                <p>{track.artists}</p>
                                <button onClick={() => handleClick(track)}>+</button>
                            </div>
                        )
                    })
                    :
                    (<div><i>Nothing to show</i></div>)
            }
        </div>
    );
}

export default Tracks;