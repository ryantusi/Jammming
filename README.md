# 🎵 Jammming

Welcome to **Jammming**! 🎶 This is a React web app that leverages the Spotify API to fetch data, providing users with a seamless interface to search for tracks, create playlists, and upload them to their Spotify accounts. 🚀 [Live here](https://jammming-rt.netlify.app/)

## 🌟 Features

- **Search Tracks**: Quickly search for your favorite tracks using the Spotify API. 🔍
- **Create Playlists**: Add tracks to a custom playlist and manage them with ease. 📃
- **Upload Playlists**: Directly upload your created playlists to your Spotify account. 🎧

## 🛠️ Project Structure

The project is organized into the following main directories within the `src` folder:

### 📂 components

This folder contains all the React components and their corresponding CSS files:

- **App**: The main component that ties everything together.
- **Add**: Component responsible for adding tracks.
- **Tracks**: Component for displaying and managing tracks.
- **Search**: Component for the search bar.
- **Playlist**: Component for the playlist management.

### 📂 helpers

This folder contains the `spotify.js` file which handles the Spotify API calls through asynchronous functions:

- **getAccessToken**: Function to get the access token from Spotify.
- **search**: Function to search for tracks on Spotify.
- **createPlaylist**: Function to create a new playlist in the user's Spotify account.

## 🚀 Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/ryantusi/Jammming.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Jamming
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- Spotify for their awesome API. 🎧
- The React community for their support and resources. 🌐
- Codecademy for their teachings. 💻
- Ofcourse, Myself :) - [Ryan Tusi](https://www.linkedin.com/in/ryantusi/)

Hope you enjoy coding **Jammming**! 🎶 Make sure to create a pull request if you have better ideas.

---

Happy coding! 💻✨

