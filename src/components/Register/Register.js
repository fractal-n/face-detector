import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    fetch(`https://fractal-n-face-detector-api.herokuapp.com/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onSubmitRegister();
    }
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4 white" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mv3">
                <label
                  className="db fw6 lh-copy f4 white"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db white fw6 lh-copy f4" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  onKeyPress={this.onEnterKeyPress}
                  className="b white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="f4 link dim br-pill ba bw1 ph5 pv2 mb2 dib white bg-light-purple grow pointer f4 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
