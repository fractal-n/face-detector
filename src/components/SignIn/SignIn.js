import React, { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      errorMsg: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch(`https://fractal-n-face-detector-api.herokuapp.com/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        this.setState({ errorMsg: "" });
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({
            errorMsg: "email and password combination is not matched",
          });
        }
      })
      .catch(console.log);
  };

  onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onSubmitSignIn();
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f4 white"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  onKeyPress={this.onEnterKeyPress}
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
            <div className="red mb3">{this.state.errorMsg}</div>
            <div>
              <input
                onClick={this.onSubmitSignIn}
                className="f4 link dim br-pill ba bw1 ph5 pv2 mb2 dib white bg-light-purple grow pointer f4 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f4 white link dim black ph4 pv2 db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
