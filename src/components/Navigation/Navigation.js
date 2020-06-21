import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const action = () => {
    if (isSignedIn) {
      return (
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
          <p
            onClick={() => onRouteChange("signout")}
            className="f4 grow no-underline br-pill ba bw1 dib white ph3 pv2 mb2 mr3 pointer"
          >
            Sign out
          </p>
        </div>
      );
    } else {
      return (
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
          <p
            onClick={() => onRouteChange("signin")}
            className="f4 grow no-underline br-pill ba bw1 dib white ph3 pv2 mb2 mr3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f4 grow no-underline br-pill ba bw1 dib white ph3 pv2 mb2 mr3 pointer"
          >
            Register
          </p>
        </div>
      );
    }
  };

  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <div className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l">
        <Logo />
      </div>
      {action()}
    </nav>
  );
};

export default Navigation;
