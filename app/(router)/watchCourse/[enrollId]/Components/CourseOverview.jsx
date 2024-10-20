import VideoPlayer from "@/app/(router)/course-preview/[courseid]/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import React from "react";
import Markdown from "react-markdown";

const CourseOverview = ({ courseInfo, activeChapterIndex, watchMode=false, setChapterCompleted }) => {
  // Helper function to convert YouTube URLs to embeddable format
  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  if (!courseInfo) {
    return <p>No course information available</p>;
  }

  // Destructure relevant fields from the courselist object
  const { name,auther, description } = courseInfo;

  // Extract video URL if available from the first chapter
//   const videoUrl = chapter && chapter.length > 0 ? chapter[0].youtubeurl : null;

  return (
    <div className="course-overview">
      <h2 className="text-[20px] font-semibold">{courseInfo.name || "Unknown Course"}</h2>
      <h3 className="text-gray-500 text-[14px] mb-3">Author: {courseInfo.auther || "Unknown Author"}</h3>

      {/* Video player */}
      <VideoPlayer videoUrl={convertToEmbedUrl(courseInfo.chapter[activeChapterIndex]?.youtubeurl) || ''} />
      {/* Description */}
      <h3 className="mt-5 text-[17px] font-semibold">

        {
          watchMode?
          <span className="flex justify-between items-center">{courseInfo.chapter[activeChapterIndex]?.name}
          <Button onClick={()=>setChapterCompleted(courseInfo.chapter[activeChapterIndex]?.id)} >Mark Completed</Button>
          
          </span>
          :
          <span>  About this Course</span>
          
        }
        
      </h3>

      {
        watchMode?
        <Markdown className="text-[13px] font-light my-2 leading-6">{courseInfo.chapter[activeChapterIndex]?.shortDesc}</Markdown>
        :
        <Markdown className="text-[13px] font-light my-2 leading-6">{courseInfo.description}</Markdown>

      }
    </div>
  );
};

export default CourseOverview;
