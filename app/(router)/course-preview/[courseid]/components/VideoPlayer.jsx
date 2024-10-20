import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ videoUrl }) {
  return (
    <div className="video-player">
      <ReactPlayer url={videoUrl} key={videoUrl} controls width="650px" height="300px" />
    </div>
    
  );
}

export default VideoPlayer;
