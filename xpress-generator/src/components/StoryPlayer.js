import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const StoryPlayer = ({
  mode,
  storyData,
  currentExpressionBank,
  onCompletion,
}) => {
  const audioRef = useRef(null);
  const [expressionBank] = useState(currentExpressionBank);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  const resetFunc =
    'anime.timeline({easing:"easeInOutQuad",duration:500}).add({targets:[eyes.elements.leftEye,eyes.elements.rightEye],backgroundColor:"#000000",scaleX:1,scaleY:1, scale: 1, translateX:"0%",translateY:"0%",borderRadius:"50%",},0).add({targets:[eyes.elements.upperLeftEyelid,eyes.elements.upperRightEyelid,eyes.elements.lowerRightEyelid,eyes.elements.lowerLeftEyelid,],translateY:"0%",rotate:"0deg",},0).add({targets:eyes.elements.mouth,backgroundColor:"#ffc0cb",scaleX: 1, scaleY: 1, scale: 1, width: "20vmin", height: "8vmin",translateX:"0%",translateY:"0%",borderRadius:"50%",rotate:"0deg",},0) .add({ targets: [eyes.elements.face, eyes.elements.lowerLeftEyelid, eyes.elements.lowerRightEyelid, eyes.elements.upperLeftEyelid, eyes.elements.upperRightEyelid], backgroundColor: "#f5f5f5" }, 0)';

  const initStoryUnified = async (storyData, mode) => {
    axios.post("http://localhost:3001/express", {
      expression: "reset",
    });
    const base64Audio = storyData[1];
    const story_reactions = mode === "dynamic" ? storyData[2] : storyData[3];

    if (!window.audioContext) {
      window.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const analyser = window.audioContext.createAnalyser();
    analyser.fftSize = 256;

    const audioBuffer = await fetch(`${base64Audio}`)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => window.audioContext.decodeAudioData(arrayBuffer));

    const source = window.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(window.audioContext.destination);

    source.onended = async () => {
      axios.post("http://localhost:3001/express", {
        expression: "stopTalking",
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      axios.post("http://localhost:3001/express", {
        expression: "reset",
      });
      await new Promise((resolve) => setTimeout(resolve, 250));
      axios.post("http://localhost:3001/express", {
        expression: "blinking",
      });
      onCompletion();
    };

    if (window.audioContext.state === "suspended") {
      await window.audioContext.resume();
    }
    source.start(0);
    axios.post("http://localhost:3001/express", {
      expression: "talking",
    });

    const storyStart = Date.now();

    for (const reaction of story_reactions) {
      const now = Date.now();
      const elapsed = (now - storyStart) / 1000;
      let waitTime = reaction[1] - elapsed;
      if (waitTime < 0) {
        waitTime = 0;
      }

      await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));

      if (mode === "dynamic") {
        console.log(reaction[0]);
        const program = JSON.parse(reaction[0]);
        axios.post("http://localhost:3001/exec-func", program);
      } else if (mode === "banked") {
        axios.post("http://localhost:3001/express", {
          expression: "reset",
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        const emotion = reaction[0];
        axios.post("http://localhost:3001/exec-func", {
          program: expressionBank[emotion],
        });
      }
    }
  };

  useEffect(() => {
    initStoryUnified(storyData, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <audio id="storyAudio" ref={audioRef} controls hidden />
    </div>
  );
};

export default StoryPlayer;
