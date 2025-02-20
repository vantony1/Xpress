import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Face from "./Face";
import FaceController from "./FaceController";
import { Button } from "@mui/material";

const Experiment = ({
  mode,
  storyData,
  currentExpressionBank,
  onCompletion,
}) => {
  const faceRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const mouthRef = useRef(null);
  const upperLeftEyelidRef = useRef(null);
  const upperRightEyelidRef = useRef(null);
  const lowerLeftEyelidRef = useRef(null);
  const lowerRightEyelidRef = useRef(null);
  const audioRef = useRef(null);
  const [scores, setScores] = useState([]);
  const [record, setRecord] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // New state to control the start of the experiment
  const [expressionBank, setExpressionBank] = useState(currentExpressionBank);
  const [countdown, setCountdown] = useState(7); // 7 seconds countdown

  const resetFunc =
    'anime.timeline({easing:"easeInOutQuad",duration:500}).add({targets:[elements.leftEye,elements.rightEye],backgroundColor:"#000000",scaleX:1,scaleY:1, scale: 1, translateX:"0%",translateY:"0%",borderRadius:"50%",},0).add({targets:[elements.upperLeftEyelid,elements.upperRightEyelid,elements.lowerRightEyelid,elements.lowerLeftEyelid,],translateY:"0%",rotate:"0deg",},0).add({targets:elements.mouth,backgroundColor:"#ffc0cb",scaleX: 1, scaleY: 1, scale: 1, width: "20vmin", height: "8vmin",translateX:"0%",translateY:"0%",borderRadius:"50%",rotate:"0deg",},0) .add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: "#f5f5f5" }, 0)';

  const initStoryUnified = async (storyData, mode) => {
    // Ensure the task is started before executing
    if (!hasStarted) return;

    const faceController = new FaceController({
      face: faceRef.current,
      leftEye: leftEyeRef.current,
      rightEye: rightEyeRef.current,
      mouth: mouthRef.current,
      upperLeftEyelid: upperLeftEyelidRef.current,
      upperRightEyelid: upperRightEyelidRef.current,
      lowerLeftEyelid: lowerLeftEyelidRef.current,
      lowerRightEyelid: lowerRightEyelidRef.current,
    });

    const base64Audio = storyData[1];
    const story_reactions = mode === "dynamic" ? storyData[2] : storyData[3];

    if (!window.audioContext) {
      window.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const analyser = window.audioContext.createAnalyser();
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const audioBuffer = await fetch(`${base64Audio}`)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => window.audioContext.decodeAudioData(arrayBuffer));

    const source = window.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(window.audioContext.destination);

    const animateTalking = () => {
      requestAnimationFrame(animateTalking);
      analyser.getByteFrequencyData(dataArray);
      const averageVolume =
        dataArray.reduce((a, b) => a + b) / dataArray.length;
      faceController.expressTalking(averageVolume);
    };

    source.onended = async () => {
      faceController.stopTalkingAnimation();
      onCompletion();
    };

    if (window.audioContext.state === "suspended") {
      await window.audioContext.resume();
    }
    source.start(0);
    setRecord(true);
    animateTalking();

    const storyStart = Date.now();

    for (const reaction of story_reactions) {
      const now = Date.now();
      const elapsed = (now - storyStart) / 1000;
      let waitTime = reaction[1] - elapsed;
      if (waitTime < 0) {
        waitTime = 0;
      }

      await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
      //faceController.stopTalkingAnimation();
      // await new Promise((resolve) => setTimeout(resolve, 50));

      if (mode === "dynamic") {
        console.log(reaction[0]);
        const program = JSON.parse(reaction[0]).program;
        const func = new Function("anime", "elements", program);
        func(anime, faceController.elements);
      } else if (mode === "banked") {
        const reset = new Function("anime", "elements", resetFunc);
        reset(anime, faceController.elements);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const emotion = reaction[0];
        const func = new Function("anime", "elements", expressionBank[emotion]);
        func(anime, faceController.elements);
      }
    }
  };
  // useEffect to trigger the start of the experiment
  useEffect(() => {
    if (hasStarted) {
      initStoryUnified(storyData, mode);
    }
  }, [hasStarted]); // Dependency on hasStarted

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasStarted) {
        console.log("Automatically starting story narration due to timeout.");
        setHasStarted(true);
      }
    }, 7000); // 7 seconds

    const countdownTimer = setInterval(() => {
      setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000); // update every second

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer); // Clear interval on cleanup
    };
  }, []);

  useEffect(() => {
    console.log("recording data: ", record);
    console.log("current scores: ", scores);
  }, [record]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!hasStarted ? (
        <>
          <Button
            variant="contained"
            onClick={() => setHasStarted(true)}
            style={{ zIndex: 5 }}
          >
            Begin Story Narration
          </Button>
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "red",
              fontSize: "20px",
            }}
          >
            {countdown > 0
              ? `Automatically Starting Story Narration in ${countdown}s`
              : "Starting..."}
          </div>
        </>
      ) : (
        <>
          <Face
            faceRef={faceRef}
            leftEyeRef={leftEyeRef}
            rightEyeRef={rightEyeRef}
            mouthRef={mouthRef}
            upperLeftEyelidRef={upperLeftEyelidRef}
            upperRightEyelidRef={upperRightEyelidRef}
            lowerLeftEyelidRef={lowerLeftEyelidRef}
            lowerRightEyelidRef={lowerRightEyelidRef}
            style={{
              width: "80%",
              height: "80%",
              position: "absolute",
            }}
          />
        </>
      )}
      <audio id="storyAudio" ref={audioRef} controls hidden />
    </div>
  );
};

export default Experiment;
