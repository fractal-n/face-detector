import React, { Component } from "react";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";

import SignIn from "./components/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";
import Register from "./components/Register/Register";

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

const initialState = {
  input: "",
  imageUrl: "",
  faces: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

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

  // This is demografic info of the face. I collected the data but don't have time to display it.
  // It requires lots of hours to play with css, and I'm not good with that.
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

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch(`https://fractal-n-face-detector-api.herokuapp.com/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        fetch(`https://fractal-n-face-detector-api.herokuapp.com/image`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            this.setState({ user: { ...this.state.user, entries: count } });
          })
          .catch(console.log);

        this.setState({ faces: [] });
        response.outputs[0].data.regions.forEach((region) =>
          this.displayFaceBox(this.calculateFace(region))
        );
      })
      .catch(console.log);
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: route });
  };

  render() {
    const home = () => {
      return (
        <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onPictureSubmit={this.onPictureSubmit}
          />
          <FaceDetector
            imageUrl={this.state.imageUrl}
            faces={this.state.faces}
          />
        </div>
      );
    };

    const routes = () => {
      switch (this.state.route) {
        case "home":
          return home();
        case "register":
          return (
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          );
        default:
          return (
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          );
      }
    };

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
        />
        {routes()}
      </div>
    );
  }
}

export default App;
