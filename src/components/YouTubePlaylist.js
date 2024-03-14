import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubePlaylist = () => {
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const apiKey = 'AIzaSyB_RsYo52sR0mobRyWpwq1pk9Mk95N2v5w';
        const playlistId = 'PLTGGban6qnWAjftkW2kejlUgZlnfLc3Ac';
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
        );
        if (!response.data || !response.data.items) {
          throw new Error('No playlist data found');
        }
        setPlaylistItems(response.data.items);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchPlaylistData();
  }, []);

  return (
    <div className="youtube-playlist">
      {playlistItems.map((item) => (
        <div key={item.id} className="playlist-item">
          <h3>{item.snippet.title}</h3>
          {item.snippet.thumbnails && item.snippet.thumbnails.default && (
            <img src={item.snippet.thumbnails.default.url} alt="Thumbnail" />
          )}
          <p>{item.snippet.description}</p>
          <iframe
            title={item.snippet.title}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default YouTubePlaylist;
