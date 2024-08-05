const clientId = "ee04072e66fd4ada869db4a9190201f8";
const redirectUri = 'https://jammming-rt.netlify.app/';
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
];

let accessToken;

const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  }
};

/*const getAccessToken = async () => {
    const tokenURL = "https://accounts.spotify.com/api/token";
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
    };
    const body = 'grant_type=client_credentials';

    const response = await fetch(tokenURL, {
        method: "POST",
        headers: headers,
        body: body
    });

    const data = await response.json();
    const token = data.access_token;
    return token;
};*/

export const search = async (text) => {
    const token = await getAccessToken();
    const query = encodeURIComponent(text);

    //const artistUrl = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=3`;
    //const albumUrl = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=3`;

    const trackUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const headers = {
        "Authorization": `Bearer ${token}` 
    };

    try {
        
        /*const [artistResponse, albumResponse, trackResponse] = await Promise.all([
            fetch(artistUrl, { headers }),
            fetch(albumUrl, { headers }),
            fetch(trackUrl, { headers })
        ]);

        const [artistData, albumData, trackData] = await Promise.all([
            artistResponse.json(),
            albumResponse.json(),
            trackResponse.json()
        ]);*/

        const response = await fetch(trackUrl, { headers });
        const trackData = await response.json();

        const tracks = [];

        /*if(artistData.artists) {
            const artistIds = artistData.artists.items.map(artist => artist.id);
            const artistTracks = await artistToTracks(artistIds, headers);
            tracks.push(...artistTracks);
        }

        if(albumData.albums) {
            const albumIds = albumData.albums.items.map(album => album.id);
            const albumTracks = await albumToTracks(albumIds, headers);
            tracks.push(...albumTracks);
        }*/

        if(trackData.tracks) {
            tracks.push(...trackData.tracks.items);
        }

        const TRACKS = getTracks(tracks);

        //console.dir(tracks, { depth:null });

        console.log(TRACKS);
        //console.log(TRACKS.length);

        return TRACKS;

    } catch (error) {
        console.error("Error in searching: " + error);
        return NaN;
    }

    /*async function artistToTracks(artistIds, headers) {
        const tracks = [];
        for (let artistId of artistIds) {
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US&limit=3`, { headers });
            const data = await response.json();
            tracks.push(...data.tracks);
        }
        return tracks;
    }

    async function albumToTracks(albumIds, headers) {
        const tracks = [];
        for (let albumId of albumIds) {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=3`, { headers });
            const data = await response.json();
            tracks.push(...data.items);
        }
        return tracks;
    }*/

    function getTracks(tracks) {
        const TRACKS = [];

        tracks.forEach(track => {
            const name = track.name;
            const artists = track.artists.map(artist => artist.name).join(", ");
            const popularity = track.popularity;
            const uri = track.uri;
            const photo = track.album.images[0].url;

            TRACKS.push({
               name: name,
               artists: artists,
               popularity: popularity, 
               uri: uri,
               photo: photo
            });
        });

        TRACKS.sort((a, b) => b.popularity - a.popularity);
        return TRACKS;
    }
};

export const createPlaylist = async (name, playlist) => {
    const accessToken = await getAccessToken();
    const playlistName = name;
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    });
    const userData = await userResponse.json();
    const userId = userData.id;

    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName,
          description: "Created with my Jamming Spotify React App",
          public: false
        })
    });
    const createPlaylistData = await createPlaylistResponse.json();
    const playlistId = createPlaylistData.id;

    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: playlist.map(track => track.uri)
        })
    });

    if (addTracksResponse.ok) {
        alert('Playlist created and tracks added successfully!');
        window.location.href = "https://jammming-rt.netlify.app/"; 
    } else {
        alert('There was an error adding tracks to the playlist.');
    }
};



