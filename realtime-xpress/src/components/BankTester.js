import React from "react";
import axios from "axios";

const testBank = {
  happy: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#86a8e7', scaleX: 0.9, scaleY: 0.9, borderRadius: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '-15deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%', rotate: '10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1, scaleY: 1, width: '10vmin', height: '6vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#98FB98', scaleX: 1.1, scaleY: 1.1 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-2%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-2%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1.1, scaleY: 1.1, borderRadius: '0% 0% 50% 50%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  sad: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#1E3A5F', scaleX: 0.6, scaleY: 0.6, translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '40%', rotate: '-15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '40%', rotate: '15deg' }, 0)\n.add({ targets: [elements.lowerLeftEyelid, elements.lowerRightEyelid], translateY: '0%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#708090', width: '8vmin', height: '2vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#D3D3D3' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#6A8EAE', scaleX: 0.7, scaleY: 0.7, borderRadius: '30%', translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '20%', rotate: '10deg' }, 0)\n.add({ targets: [elements.lowerLeftEyelid, elements.lowerRightEyelid], translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#A9B0B3', width: '8vmin', height: '4vmin', borderRadius: '0% 0% 50% 50%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  surprise: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#FFFFFF', scaleX: 1.4, scaleY: 1.4, translateY: '-10%' }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#FFFFFF', scaleX: 1.4, scaleY: 1.4, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-50%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-50%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', width: '12vmin', height: '12vmin', borderRadius: '50%', scaleX: 1.5, scaleY: 1.5 }, 0)\n.add({ targets: elements.face, backgroundColor: '#F5F5F5' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#D3D3D3', scaleX: 1.1, scaleY: 1.1, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFD6DB', width: '8vmin', height: '8vmin', borderRadius: '50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  stress: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, translateX: '-10%', scaleX: 0.5, scaleY: 0.5, backgroundColor: '#3e3e3e' }, 0)\n.add({ targets: elements.rightEye, translateX: '10%', scaleX: 0.5, scaleY: 0.5, backgroundColor: '#3e3e3e' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#7f7f7f', width: '30vmin', height: '4vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#787878', scaleX: 0.7, scaleY: 0.7 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#9e9e9e', width: '8vmin', height: '2vmin', borderRadius: '0% 0% 50% 50%', translateY: '1%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
  },
  calm: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#98FB98', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#98FB98', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E6E6FA', scaleX: 1.1, scaleY: 1, borderRadius: '0% 0% 50% 50%' }, 0)\n.add({ targets: elements.face, backgroundColor: '#F5F5F5' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, backgroundColor: '#CCFFCC', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#CCFFCC', scaleX: 1, scaleY: 1 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-3%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-3%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#EEDFF2', scaleX: 1, scaleY: 1, borderRadius: '0% 0% 50% 50%' }, 0)\n.add({ targets: elements.face, backgroundColor: '#F5F5F5' }, 0)",
  },
  confusion: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.2, scaleY: 1.2, translateY: '-10%', backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.rightEye, scaleX: 0.8, scaleY: 0.8, translateY: '5%', backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFE4C4', width: '8vmin', height: '4vmin', borderRadius: '0%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFF5E1' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.1, scaleY: 1.1, translateY: '-5%', backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.rightEye, backgroundColor: '#D3D3D3' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '20%', rotate: '-5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFDAB9', scaleX: 0.8, scaleY: 1, borderRadius: '0% 50% 50% 0%' }, 0)\n.add({ targets: elements.face, backgroundColor: '#F5F5F5' }, 0)",
  },
  tired: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#A9A9A9', scaleX: 0.8, scaleY: 0.8, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-30%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-30%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E6E6FA', width: '12vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#DCDCDC' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#B0C4DE', scaleX: 0.9, scaleY: 0.9, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFDAB9', width: '8vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
  },
  interest: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#228B22', scaleX: 1.2, scaleY: 1.2, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#F88379', scaleX: 1.1, scaleY: 1.1, borderRadius: '0% 0% 50% 50%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#D3D3D3' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#32CD32' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#32CD32' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '-2deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '2deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', borderRadius: '0% 0% 50% 50%', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
  },
  fear: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#FFFFFF', scaleX: 1.2, scaleY: 1.2, translateY: '-10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '20deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '-20deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-30%', rotate: '15deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#D1E8FF', scaleX: 1.5, scaleY: 1.2, borderRadius: '50%', width: '12vmin', height: '8vmin' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#E8E8E8' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], scaleX: 1.05, scaleY: 1.05, translateY: '-5%', backgroundColor: '#FFFFFF' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '5%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '5%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#E0F1FF', scaleX: 0.8, scaleY: 0.6, borderRadius: '50% 50% 30% 30%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F0F0F0' }, 0)",
  },
  concern: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#6E6E6E', scaleX: 0.8, scaleY: 0.8, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '15deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-15deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-20%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-20%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFC0CB', width: '22vmin', height: '2vmin', borderRadius: '0%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#E8E8E8' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#A0A0A0', scaleX: 0.9, scaleY: 0.9 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '10%', rotate: '5deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#F8C8D0', borderRadius: '50% 50% 0% 0%', scaleX: 1, scaleY: 1 }, 0)",
  },
  excitement: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.2, scaleY: 1.2, backgroundColor: '#00FF00' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.2, scaleY: 1.2, backgroundColor: '#00FF00' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%', rotate: '0deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-10%', rotate: '0deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FF69B4', scaleX: 1.5, scaleY: 1, width: '18vmin', height: '12vmin', borderRadius: '50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFFE0' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: elements.leftEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#98FB98' }, 0)\n.add({ targets: elements.rightEye, scaleX: 1.1, scaleY: 1.1, backgroundColor: '#98FB98' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '50%' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#FFB6C1', width: '13vmin', borderRadius: '0% 0% 50% 50%', translateX: '0%', translateY: '0%', rotate: '0deg' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#FFFACD' }, 0)",
  },
  disgust: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#556B2F', scaleX: 0.5, scaleY: 0.5, translateX: '-5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '25deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-25deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#9E7BB5', scaleX: 0.8, scaleY: 0.8, borderRadius: '50% 50% 0% 0%', translateX: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#F5F5F5' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8FBC8F', scaleX: 0.7, scaleY: 0.7 }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '30%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '30%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-5%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-5%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#C9B0D3', width: '8vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', scaleX: 0.8, scaleY: 0.8 }, 0)",
  },
  anger: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#FF0000', scaleX: 0.5, scaleY: 0.5, borderRadius: '10%', translateY: '10%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '20deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-20deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%', rotate: '10deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%', rotate: '-10deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#800000', width: '12vmin', height: '4vmin', borderRadius: '0% 0% 50% 50%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#696969' }, 0)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 })\n.add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#8B0000', scaleX: 0.7, scaleY: 0.7, translateY: '5%' }, 0)\n.add({ targets: elements.upperLeftEyelid, translateY: '25%', rotate: '10deg' }, 0)\n.add({ targets: elements.upperRightEyelid, translateY: '25%', rotate: '-10deg' }, 0)\n.add({ targets: elements.lowerLeftEyelid, translateY: '-15%', rotate: '5deg' }, 0)\n.add({ targets: elements.lowerRightEyelid, translateY: '-15%', rotate: '-5deg' }, 0)\n.add({ targets: elements.mouth, backgroundColor: '#A52A2A', width: '8vmin', height: '4vmin', borderRadius: '50% 50% 0% 0%', translateY: '5%' }, 0)\n.add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#A9A9A9' }, 0)",
  },

  test: {
    high_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 }) .add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#000000', scaleX: 1, scaleY: 1, borderRadius: '50%', translateX: '0%', translateY: '0%', rotateX: 0, rotateY: 0 }, 0) .add({ targets: [elements.upperLeftEyelid, elements.upperRightEyelid], translateY: '10%', rotate: '0deg' }, 0) .add({ targets: [elements.lowerLeftEyelid, elements.lowerRightEyelid], translateY: '-5%', rotate: '0deg' }, 0) .add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1, scaleY: 1, width: '20vmin', height: '8vmin', borderRadius: '50%', translateX: '10%', translateY: '10%', rotate: '0deg' }, 0) .add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#4A90E2' }, 0) .add({ targets: elements.mouth, width: '20vmin', height: '8vmin', translateY: '5vmin', borderRadius: '10%' }, 500) .add({ targets: elements.mouth, width: '20vmin', height: '8vmin', translateY: '5vmin', borderRadius: '50%' }, 750)",
    low_intensity:
      "anime.timeline({ easing: 'easeInOutQuad', duration: 1000 }) .add({ targets: [elements.leftEye, elements.rightEye], backgroundColor: '#000000', scaleX: 1, scaleY: 1, borderRadius: '50%', translateX: '0%', translateY: '0%', rotateX: 0, rotateY: 0 }, 0) .add({ targets: [elements.upperLeftEyelid, elements.upperRightEyelid], translateY: '10%', rotate: '0deg' }, 0) .add({ targets: [elements.lowerLeftEyelid, elements.lowerRightEyelid], translateY: '-5%', rotate: '0deg' }, 0) .add({ targets: elements.mouth, backgroundColor: '#FFC0CB', scaleX: 1, scaleY: 1, width: '20vmin', height: '8vmin', borderRadius: '50%', translateX: '10%', translateY: '10%', rotate: '0deg' }, 0) .add({ targets: [elements.face, elements.lowerLeftEyelid, elements.lowerRightEyelid, elements.upperLeftEyelid, elements.upperRightEyelid], backgroundColor: '#4A90E2' }, 0) .add({ targets: elements.mouth, width: '20vmin', height: '8vmin', translateY: '5vmin', borderRadius: '10%' }, 500) .add({ targets: elements.mouth, width: '20vmin', height: '8vmin', translateY: '5vmin', borderRadius: '50%' }, 750)",
  },
};
const BankTester = () => {
  const handleEmotionClick = async (emotion, intensity) => {
    // Get the program based on the selected emotion and intensity
    const program = testBank[emotion][intensity];

    // Execute the expression on the backend
    try {
      await axios.post("http://localhost:3001/exec-func", { program });
      console.log(`Executed ${emotion} with ${intensity} intensity`);
    } catch (error) {
      console.error("Error executing emotion:", error);
    }
  };

  const renderButtons = () => {
    return Object.keys(testBank).map((emotion) => (
      <div key={emotion} style={{ marginBottom: "10px" }}>
        <button
          style={buttonStyle}
          onClick={() => handleEmotionClick(emotion, "high_intensity")}
        >
          {emotion} - High Intensity
        </button>
        <button
          style={buttonStyle}
          onClick={() => handleEmotionClick(emotion, "low_intensity")}
        >
          {emotion} - Low Intensity
        </button>
      </div>
    ));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
    transition: "background-color 0.3s ease",
    outline: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Emotion Tester</h1>
      {renderButtons()}
    </div>
  );
};

export default BankTester;
