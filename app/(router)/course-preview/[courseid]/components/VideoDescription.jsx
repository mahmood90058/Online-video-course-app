import Markdown from "react-markdown";
import VideoPlayer from "./VideoPlayer";

const VideoDescription = ({ courseInfo }) => {
  const convertToEmbedUrl = (url) => {
    if (!url) return '';

    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  if (!courseInfo || courseInfo.length === 0) {
    return <p>No courses available</p>;
  }

  const course = courseInfo[0]; // Assuming there's at least one course

  return (
    <div>
      <h2 className="text-[20px] font-semibold">{course.name}</h2>
      <h2 className="text-gray-500 text-[14px] mb-3">{course.auther}</h2>

      {/* Video player */}
      <VideoPlayer videoUrl={convertToEmbedUrl(course.chapter[0]?.youtubeurl) || ''} />

      {/* Description */}

      <h2 className="mt-5 text-[17px] font-semibold">About this Course</h2>
      <Markdown className="text-[13px] font-light my-2 leading-6">{course.description}</Markdown>

    </div>
  );
};

export default VideoDescription;
