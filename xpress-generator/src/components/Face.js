import React from 'react';
import './Face.css';

const Face = ({
  faceRef,
  leftEyeRef,
  rightEyeRef,
  mouthRef,
  upperLeftEyelidRef,
  upperRightEyelidRef,
  lowerLeftEyelidRef,
  lowerRightEyelidRef,
}) => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div className="face" ref={faceRef} style={{ position: 'absolute', zIndex: 1 }}>
        <div className="eye left" ref={leftEyeRef}>
          <div className="eyelid upper" ref={upperLeftEyelidRef}></div>
          <div className="eyelid lower" ref={lowerLeftEyelidRef}></div>
        </div>
        <div className="mouth" ref={mouthRef}></div>
        <div className="eye right" ref={rightEyeRef}>
          <div className="eyelid upper" ref={upperRightEyelidRef}></div>
          <div className="eyelid lower" ref={lowerRightEyelidRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Face;

