import React, { useState } from "react";
import "./Search.css";

function Search(props) {
    const [input, setInput] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.getInput(input);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input placeholder="Enter song, artist, or album" type="text" value={input} onChange={handleChange}/>
            <button type="submit">Search</button>
        </form>
    );
}

export default Search;