import React, { useEffect, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";

const pilotIVBank = {
  happy: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.2, scaleY: 1.2, translateY: '-5%', backgroundColor: '#32CD32' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.2, scaleY: 1.2, translateY: '-5%', backgroundColor: '#32CD32' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF69B4', scaleX: 1.5, scaleY: 1.5, borderRadius: '0% 0% 50% 50%', width: '20vmin', height: '8vmin', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFFE0' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#98FB98', scaleX: 1.1, scaleY: 1.1, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%', rotate: '2deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%', rotate: '-2deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-3%', rotate: '2deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-3%', rotate: '-2deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', scaleX: 1.2, scaleY: 1.1, borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFACD' }, 0)",
  },
  sad: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#1E3A5F', scaleX: 0.6, scaleY: 0.6, translateY: '25%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '40%', rotate: '-15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '40%', rotate: '15deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#708090', width: '10vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#D3D3D3' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#6A8EAE', scaleX: 0.7, scaleY: 0.7, borderRadius: '30%', translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#A9B0B3', width: '10vmin', height: '4vmin', borderRadius: '0% 0% 50% 50%', translateY: '5%' }, 0)",
  },
  surprise: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8A2BE2', scaleX: 1.3, scaleY: 1.3, translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', width: '20vmin', height: '12vmin', borderRadius: '50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#E0FFFF' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.15, scaleY: 1.15, backgroundColor: '#9370DB' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.15, scaleY: 1.15, backgroundColor: '#9370DB' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '20%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', width: '15vmin', height: '8vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F8FF' }, 0)",
  },
  stress: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#708090', scaleX: 0.8, scaleY: 0.8, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#8B0000', width: '15vmin', height: '2vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#DCDCDC' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#BC8F8F', width: '10vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
  },
  calm: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#ADD8E6', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#ADD8E6', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#F08080', scaleX: 1.2, scaleY: 1, width: '22vmin', height: '8vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0FFF0' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], scaleX: 1.05, scaleY: 1.05, backgroundColor: '#B0E0E6' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '3%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '3%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFE5B4', scaleX: 1.1, scaleY: 1, borderRadius: '10% 10% 0% 0%', width: '21vmin', height: '8vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5FFFA' }, 0)",
  },
  confusion: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.2, scaleY: 1.2, translateY: '-10%' }, 0)\n.add({ targets: elements.rightEye, scaleX: 0.8, scaleY: 0.8, translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFE4B5', width: '8vmin', height: '4vmin', borderRadius: '10%', translateX: '-5%', translateY: '5%', rotate: '-5deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFF5E1' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.1, scaleY: 1.1, translateY: '10%' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '-5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFDAB9', width: '8vmin', height: '4vmin', borderRadius: '10%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  tired: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#A9A9A9', scaleX: 0.85, scaleY: 0.85, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%', rotate: '20deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '-20deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E6E6FA', width: '15vmin', height: '2vmin', borderRadius: '0% 0% 50% 50%', translateY: '5%', rotate: '-2deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5DC' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#D3D3D3', scaleX: 0.9, scaleY: 0.9, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-8%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-8%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D3D3D3', width: '10vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '2%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
  },
  interest: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#32CD32', scaleX: 1.1, scaleY: 1.1 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#32CD32', scaleX: 1.1, scaleY: 1.1 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1.2, scaleY: 1, borderRadius: '0% 0% 50% 50%' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#90EE90', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#90EE90', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-3%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-3%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', scaleX: 1, scaleY: 1, borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  fear: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#FFFFFF', scaleX: 1.3, scaleY: 1.3, translateY: '-25%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#ADD8E6', width: '20vmin', height: '12vmin', borderRadius: '50%', scaleX: 1.5, scaleY: 1.5 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], scaleX: 1.15, scaleY: 1.15, translateY: '-10%', backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '-10%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E6E6FA', scaleX: 1, scaleY: 1, borderRadius: '50% 50% 0% 0%', width: '15vmin', height: '6vmin', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFFFF' }, 0)",
  },
  concern: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#654321', scaleX: 0.9, scaleY: 0.9, translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D2B48C', width: '10vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5DC' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8B4513', scaleX: 0.95, scaleY: 0.95, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '15%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '15%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D2B48C', width: '10vmin', height: '4vmin', translateY: '5%', borderRadius: '50% 50% 0% 0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFF8DC' }, 0)",
  },
  disgust: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#556B2F', scaleX: 0.7, scaleY: 0.7, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '40%', rotate: '-20deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '40%', rotate: '20deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-30%', rotate: '15deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#800080', width: '8vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#98FB98' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8FBC8F', scaleX: 0.8, scaleY: 0.8, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%', rotate: '10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D8BFD8', width: '10vmin', height: '4vmin', translateY: '5%', borderRadius: '50% 50% 0% 0%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5FFFA' }, 0)",
  },
  anger: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8B0000', scaleX: 0.85, scaleY: 0.85, translateY: '25%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%', rotate: '20deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '-20deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-25%', rotate: '15deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-25%', rotate: '-15deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#800000', width: '20vmin', height: '8vmin', borderRadius: '50% 50% 0% 0%', scaleX: 1.2, scaleY: 1.2 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#A9A9A9' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#CD5C5C', scaleX: 0.9, scaleY: 0.9, translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#B22222', width: '10vmin', height: '4vmin', translateY: '5%', borderRadius: '50% 50% 0% 0%', translateX: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#D3D3D3' }, 0)",
  },
};

const Agent = () => {
  const lastProcessedIndexRef = useRef(-1);
  const lastResultIndexRef = useRef(0);
  const currentExpressionRef = useRef("neutral");
  const lastExpressionChangeTimeRef = useRef(Date.now());
  const responseSoFar = useRef("");
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const silenceDuration = 2000; // 1.5 seconds
  const [EndOfConversationState, setEndOfConversation] = useState(false);
  const [condition, setCondition] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false); // New state for button visibility

  useEffect(() => {
    const conditions = ["A", "B", "C"];
    const selectedCondition =
      conditions[Math.floor(Math.random() * conditions.length)];
    setCondition(selectedCondition);
  }, []);

  const startSilenceDetection = (stream) => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    source.connect(analyserRef.current);

    const dataArray = new Uint8Array(analyserRef.current.fftSize);

    const checkForSilence = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const averageVolume =
        dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (averageVolume < 10) {
        // Silence threshold
        if (!silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            console.log("Silence detected for 1.5 seconds");
            getResponse();
            // Handle silence detection (e.g., send a message, update UI, etc.)
          }, silenceDuration);
        }
      } else {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      }

      requestAnimationFrame(checkForSilence);
    };

    checkForSilence();
  };

  // Function to update expression and timestamp
  const updateExpressionRef = (newExpression) => {
    currentExpressionRef.current = newExpression;
    lastExpressionChangeTimeRef.current = Date.now();
  };

  const getTimeSinceLastExpressionChange = () => {
    const currentTime = Date.now();
    const lastChangeTime = lastExpressionChangeTimeRef.current;
    return (currentTime - lastChangeTime) / 1000; // Convert milliseconds to seconds
  };

  const { error, interimResult, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      crossBrowser: true,
      googleApiKey: "enter GOOGLE_API_KEY here",
      useLegacyResults: false,
      googleCloudRecognitionConfig: {
        languageCode: "en-US",
        model: "latest_long",
      },
    });

  useEffect(() => {
    if (interimResult) {
      const words = interimResult.split(" ");
      const processedIndex = lastProcessedIndexRef.current;
      const newWords = words.slice(processedIndex + 1);

      if (newWords.length >= 6) {
        const chunksToSend = newWords.slice(0, 6).slice(0, 5).join(" ");
        sendMessage(chunksToSend);
        lastProcessedIndexRef.current += 5;
      }
    }

    if (results.length > lastResultIndexRef.current) {
      console.log(
        "result: ",
        results.length,
        " lastIndex: ",
        lastResultIndexRef.current
      );
      const words = results[lastResultIndexRef.current].transcript.split(" ");
      const processedIndex = lastProcessedIndexRef.current;
      const remainingWords = words.slice(processedIndex + 1);
      const lastChunk = remainingWords.join(" ");
      if (lastProcessedIndexRef.current == -1) {
        sendMessage(lastChunk);
      }
      lastProcessedIndexRef.current = -1;
      lastResultIndexRef.current += 1;
      console.log(results);
    }
  }, [interimResult, results]);

  const sendMessage = async (message) => {
    console.log(message);
    await axios
      .post(
        "http://localhost:3002/api/react",
        {
          message: `previous_chunks: {${
            responseSoFar.current
          }} current_chunk: {${message}}, current-expression: ${
            currentExpressionRef.current
          }, time-since-expression-change: ${getTimeSinceLastExpressionChange()} seconds`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        responseSoFar.current += " " + message;
        const reaction = JSON.parse(response.data.content); // Update to handle axios response structure
        console.log(reaction);
        const emotion = reaction["emotion"];
        const intensity = reaction["intensity"];

        if (currentExpressionRef.current != emotion && emotion != "no-change") {
          updateExpressionRef(emotion);
          axios.post("http://localhost:3001/express", {
            expression: "reset",
          });
          await new Promise((resolve) => setTimeout(resolve, 300));
          if (emotion in pilotIVBank) {
            const program =
              intensity == "high"
                ? pilotIVBank[emotion]["high_intensity"]
                : pilotIVBank[emotion]["low_intensity"];
            // eslint-disable-next-line no-new-func
            axios.post("http://localhost:3001/exec-func", { program });
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const getResponse = async () => {
    await axios
      .post(
        "http://localhost:3002/api/respond",
        {
          message: `user-response: {${
            responseSoFar.current
          }}, current-expression: ${
            currentExpressionRef.current
          }, time-since-expression-change: ${getTimeSinceLastExpressionChange()} seconds`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        responseSoFar.current = "";
        const reaction = JSON.parse(response.data.content); // Update to handle axios response structure
        console.log(reaction);
        const emotion = reaction["emotion"];
        const intensity = reaction["intensity"];
        const responseText = reaction["response"];
        const end_of_conversation =
          reaction["end_of_conversation"] == "true" ? true : false;

        console.log("saying: ", responseText);
        // Speak the response aloud
        speakResponse(responseText.toString(), end_of_conversation);

        if (currentExpressionRef.current != emotion && emotion != "no-change") {
          updateExpressionRef(emotion);
          axios.post("http://localhost:3001/express", {
            expression: "reset",
          });
          await new Promise((resolve) => setTimeout(resolve, 100));
          const program =
            intensity == "high"
              ? pilotIVBank[emotion]["high_intensity"]
              : pilotIVBank[emotion]["low_intensity"];
          // eslint-disable-next-line no-new-func
          axios.post("http://localhost:3001/exec-func", { program });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const text2speech = async (speech) => {
    const apiKey = "AIzaSyBJJk3mEGV69CJXdYhPp-blKKMFIlKvu3U"; //pls change to your own google cloud TTS api key after testing
    const url = "https://texttospeech.googleapis.com/v1/text:synthesize";
    const data = {
      input: { text: speech },
      voice: {
        languageCode: "en-US",
        name: "en-US-Studio-O",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    try {
      const response = await axios.post(url, data, {
        headers: { "X-Goog-Api-Key": apiKey },
      });
      return response.data.audioContent; // This is base64-encoded MP3 audio
    } catch (error) {
      console.error("Error calling Google Text-to-Speech API:", error);
      throw error;
    }
  };

  const speakResponse = async (text, EOC) => {
    return new Promise(async (resolve, reject) => {
      try {
        stopRecognition();
        const audioContent = await text2speech(text);
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);

        audio.onplay = async () => {
          axios.post("http://localhost:3001/express", {
            expression: "talking",
          });
          await new Promise((resolve) => setTimeout(resolve, 3000));
          axios.post("http://localhost:3001/express", {
            expression: "reset",
          });
        };

        audio.onended = async () => {
          axios.post("http://localhost:3001/express", {
            expression: "stopTalking",
          });
          await new Promise((resolve) => setTimeout(resolve, 100));
          axios.post("http://localhost:3001/express", {
            expression: "reset",
          });
          console.log("Speech has finished.");
          if (!EOC) {
            startRecognition();
          } else {
            setEndOfConversation(true);
          }
          resolve("finished");
        };

        audio.play();
      } catch (error) {
        console.error("Error with Google Cloud Text-to-Speech:", error);
        reject(error);
      }
    });
  };

  const startRecognition = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(startSilenceDetection);
    setIsRecording(true);
    startSpeechToText();
  };

  const stopRecognition = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsRecording(false);
    stopSpeechToText();
  };

  const startRecognitionAndHideButton = () => {
    setButtonPressed(true); // Set the button as pressed
    getResponse(); // Start recording or other logic
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    margin: 0,
  };

  const buttonStyle = {
    padding: "20px 40px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    outline: "none",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  };

  const buttonActiveStyle = {
    backgroundColor: "#004080",
  };

  return (
    <>
      {EndOfConversationState ? (
        <h1>End of conversation. Refresh to restart</h1>
      ) : (
        <div style={containerStyle}>
          {!buttonPressed && ( // Conditionally render the button
            <button
              style={{
                ...buttonStyle,
                ...(buttonHovered ? buttonHoverStyle : {}),
                ...(buttonActive ? buttonActiveStyle : {}),
              }}
              onClick={startRecognitionAndHideButton}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              onMouseDown={() => setButtonActive(true)}
              onMouseUp={() => setButtonActive(false)}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          )}
          <audio id="storyAudio" ref={audioRef} controls hidden />
        </div>
      )}
    </>
  );
};

export default Agent;
