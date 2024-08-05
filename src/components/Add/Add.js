import React, { useState } from "react";
import { createPlaylist } from "../../helpers/spotify";
import "./Add.css";

function Add(props){
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        const name = event.target.value;
        setInput(name);
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        const playlist = props.playlist;
        createPlaylist(input, playlist);
    };
    return (
        <form onSubmit={handleSubmit} className="play-form">
            <input placeholder="Enter New Playlist Name" type="text" value={input} onChange={handleChange}/>
            <button type="submit">Create</button>
        </form>
    );
};

export default Add;