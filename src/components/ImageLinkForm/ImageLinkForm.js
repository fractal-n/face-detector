import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 white">
        {
          "This app use Clarifai visual AI engine to give you individual demographic information in your picture."
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
            onClick={onButtonSubmit}
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
