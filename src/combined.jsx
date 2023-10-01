import React from "react";
import VideoAssistant from "./asistant";
import ThreeDVideoAssistant from "./asist/virtualasistant";

const CombinedAssistant = () => {
    return (
      <div>
        <VideoAssistant />
        <ThreeDVideoAssistant />
      </div>
    );
  }
  
  export default CombinedAssistant;
  