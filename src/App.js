import React, { Component } from "react";
import "./App.css";
import "tachyons";
import Clarifai from "clarifai";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";

const clarifai = new Clarifai.App({
  apiKey: "2eb922025c064b108a239789a222134d",
});

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 700,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      faces: [],
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiBox = data.region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiBox.left_col * width,
      topRow: clarifaiBox.top_row * height,
      rightCol: width - clarifaiBox.right_col * width,
      bottomRow: height - clarifaiBox.bottom_row * height,
    };
  };

  calculateFaceInformation = (data) => {
    return data.data.concepts.filter(
      (concept) =>
        (concept.vocab_id === "age_appearance" && concept.value >= 0.4) ||
        concept.vocab_id !== "age_appearance"
    );
  };

  calculateFace = (data) => {
    return {
      box: this.calculateFaceLocation(data),
      faceInfo: this.calculateFaceInformation(data),
    };
  };

  displayFaceBox = (face) => {
    let updated = [...this.state.faces];
    updated.push(face);
    this.setState({ faces: updated });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    clarifai.models
      .predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input)
      .then((response) =>
        response.outputs[0].data.regions.forEach((region) =>
          this.displayFaceBox(this.calculateFace(region))
        )
      )
      .catch((err) => console.log("API Error!!", err));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetector imageUrl={this.state.imageUrl} faces={this.state.faces} />
      </div>
    );
  }
}

export default App;
