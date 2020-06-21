import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, route }) => {
  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <div className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l">
        <Logo />
      </div>

      {route !== "signin" ? (
        <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
          <p
            onClick={() => onRouteChange("signin")}
            className="f4 grow no-underline br-pill ba bw1 dib white ph3 pv2 mb2 mr3 pointer"
          >
            Sign out
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default Navigation;
