import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3 white w-75 center">
        {
          "This app use Clarifai visual AI engine to detect faces in your picture."
        }
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            className="f4 pa2 w-75 center"
            type="text"
          />
          <button
            onClick={onPictureSubmit}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.onPictureSubmit();
              }
            }}
            className="w-20 f4 grow ph3 pv2 ml1 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
