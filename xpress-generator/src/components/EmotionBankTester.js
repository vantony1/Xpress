import React, { useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Face from "./Face";
import FaceController from "./FaceController";
import { Button } from "@mui/material";

export const EmotionBankTester = ({ currentExpressionBank }) => {
  const faceRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const mouthRef = useRef(null);
  const upperLeftEyelidRef = useRef(null);
  const upperRightEyelidRef = useRef(null);
  const lowerLeftEyelidRef = useRef(null);
  const lowerRightEyelidRef = useRef(null);
  const [expressionBank, setExpressionBank] = useState(currentExpressionBank);

  const resetFunc =
    'anime.timeline({easing:"easeInOutQuad",duration:500}).add({targets:[elements.leftEye,elements.rightEye],backgroundColor:"#000000",scaleX:1,scaleY:1, scale: 1, translateX:"0%",translateY:"0%",borderRadius:"50%",},0).add({targets:[elements.upperLeftEyelid,elements.upperRightEyelid,elements.lowerRightEyelid,elements.lowerLeftEyelid,],translateY:"0%",rotate:"0deg",},0).add({targets:elements.mouth,backgroundColor:"#ffc0cb",scaleX: 1, scaleY: 1, scale: 1, width: "20vmin", height: "8vmin",translateX:"0%",translateY:"0%",borderRadius:"50%",rotate:"0deg",},0) .add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: "#f5f5f5" }, 0)';

  const pilotIVBank = {
    happy: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#00FF00', scaleX: 1.2, scaleY: 1.2, borderRadius: '50%', translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF6347', scaleX: 1.5, scaleY: 1.5, borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFFE0' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#98FB98', scaleX: 1, scaleY: 1, borderRadius: '30%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF7F50', scaleX: 1.1, scaleY: 1.1, borderRadius: '0% 0% 50% 50%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    sad: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#708090', scaleX: 0.9, scaleY: 0.9, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-30%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-30%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1.1, scaleY: 1.1, borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFD6C1', borderRadius: '50% 50% 0% 0%', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    surprised: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], scaleX: 1.25, scaleY: 1.25, borderRadius: '10%', translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-50%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-50%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF69B4', scaleX: 1.5, scaleY: 1.5, borderRadius: '50%', width: '12vmin', height: '8vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], scaleX: 1.15, scaleY: 1.15, translateY: '-5%', borderRadius: '45%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', scaleX: 1.1, scaleY: 1.4, borderRadius: '30%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F8F8FF' }, 0)",
    },
    shocked: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#00BFFF', scaleX: 1.5, scaleY: 1.5, borderRadius: '50%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 2, scaleY: 1, borderRadius: '50% 50% 0% 0%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#87CEEB', scaleX: 1.2, scaleY: 1.2 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '3deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '-3deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', width: '12vmin', heigh: '12vmin', borderRadius: '50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    stressed: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#708090', scaleX: 0.8, scaleY: 0.8, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-30%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-30%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D3D3D3', width: '8vmin', height: '2vmin', borderRadius: '0%', scaleX: 1.5, scaleY: 0.5 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#DCDCDC', width: '10vmin', height: '2vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    calm: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#ADD8E6', scaleX: 1, scaleY: 1, borderRadius: '30%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#F8C8DC', scaleX: 1.1, scaleY: 1, width: '10vmin', height: '6vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0E0E6', scaleX: 0.8, scaleY: 0.8, borderRadius: '30%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FADADD', scaleX: 1, scaleY: 1, width: '10vmin', height: '8vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    confused: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 0.8, scaleY: 0.8, backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.2, scaleY: 1.2, backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#DDA0DD', scaleX: 1.2, scaleY: 1, translateX: '5%', borderRadius: '25%' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#DCDCDC', scaleX: 1.2, scaleY: 1.2 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#DCDCDC', scaleX: 1.0, scaleY: 1.0, rotate: '1deg' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '3deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-3deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E6E6FA', translateX: '2%', translateY: '1%', rotate: '1deg', width: '10vmin', height: '4vmin', borderRadius: '0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    tired: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#808080', scaleX: 0.5, scaleY: 0.5 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-25%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-25%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D8BFD8', scaleX: 1.1, scaleY: 1, borderRadius: '50% 50% 0% 0%', width: '12vmin', height: '8vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#D3D3D3', scaleX: 0.9, scaleY: 0.9, borderRadius: '25%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '35%', rotate: '-10deg'  }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '35%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%'}, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1, scaleY: 1, borderRadius: '50% 50% 0% 0%', width: '10vmin', height: '8vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    interested: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#000000', scaleX: 1.5, scaleY: 1.5, borderRadius: '0%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF6347', scaleX: 1.2, scaleY: 1.2, width: '12vmin', height: '8vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#000000', scaleX: 1.2, scaleY: 1.2, borderRadius: '30%', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#000000', scaleX: 1.2, scaleY: 1.2, borderRadius: '30%', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', scaleX: 0.9, scaleY: 0.9, borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%'}, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    sorrow: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#708090', scaleX: 0.5, scaleY: 0.5 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '-15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '15deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D3A3A3', width: '12vmin', height: '8vmin', borderRadius: '50% 50% 0% 0%', scaleX: 1.2, scaleY: 1 }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#DDB6C1', width: '8vmin', height: '6vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    fear: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#708090', scaleX: 1.5, scaleY: 1.5, borderRadius: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-45%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-45%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1.2, scaleY: 1.2, width: '12vmin', height: '8vmin', borderRadius: '0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0C4DE', scaleX: 1.1, scaleY: 1.1, borderRadius: '50%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '2deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-2deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFD6DD', scaleX: 1.1, scaleY: 1, width: '10vmin', height: '8vmin', borderRadius: '50% 50% 0% 0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FAFAFA' }, 0)",
    },
    excitement: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#40E0D0', scaleX: 2, scaleY: 2, borderRadius: '10%', translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-50%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-50%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF7F50', scaleX: 1.5, scaleY: 1, borderRadius: '0% 0% 50% 50%', width: '18vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#ADD8E6', scaleX: 1.2, scaleY: 1.2, borderRadius: '20%' }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#ADD8E6', scaleX: 1.2, scaleY: 1.2, borderRadius: '20%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1.2, scaleY: 1.2, borderRadius: '0% 0% 50% 50%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    disgust: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#4CAF50', scaleX: 0.8, scaleY: 0.8, borderRadius: '50%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-25%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-25%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#C71585', scaleX: 1.1, scaleY: 1, width: '12vmin', height: '8vmin', borderRadius: '50% 50% 0% 0%' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#98FB98', scaleX: 0.9, scaleY: 0.9, borderRadius: '30%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '-2deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '2deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 0.8, scaleY: 0.8, borderRadius: '50% 50% 0% 0%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
    anger: {
      high_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8B0000', scaleX: 0.8, scaleY: 0.8, borderRadius: '30%', translateX: ['-2%', '2%'] }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D2042D', width: '12vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateX: '0%', translateY: '0%', scaleX: 1.2, scaleY: 0.8 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
      low_intensity:
        "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#CD5C5C', scaleX: 0.9, scaleY: 0.9, borderRadius: '55%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '2deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-2deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '-2deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '2deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF6347', borderRadius: '50% 50% 0% 0%', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    },
  };

  const test = async () => {
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

    const reset = new Function("anime", "elements", resetFunc);
    reset(anime, faceController.elements);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const func = new Function(
      "anime",
      "elements",
      pilotIVBank["disgust"]["low_intensity"]
    );
    func(anime, faceController.elements);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        color: "red",
        fontSize: "20px",
      }}
    >
      <>
        <Button
          variant="contained"
          onClick={() => test()}
          style={{ zIndex: 5 }}
        >
          Test Emotion
        </Button>
      </>
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
    </div>
  );
};
