import React from "react";
import "./FaceDetector.css";

const FaceDetector = ({ imageUrl, faces }) => {
  return (
    <div className="ma" style={{ display: "flex", justifyContent: "center" }}>
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="700px"
          height="auto"
        />
        {faces.map((face, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              top: face.box.topRow,
              right: face.box.rightCol,
              bottom: face.box.bottomRow,
              left: face.box.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceDetector;
