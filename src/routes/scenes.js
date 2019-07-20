import React, { Component } from "react";
import { Scene, Actions } from "react-native-router-flux";
import HomeContainer from "./Home/containers/HomeContainer";
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Scene key="login" initial={true} component={Login} title="Login" initial />
    <Scene key="signup" component={Signup} initial={false} />
    <Scene key="home" component={HomeContainer} title="Home" />
    {/*initial */}
    <Scene
      key="trackDriver"
      component={TrackDriverContainer}
      title="trackDriver"
    />
  </Scene>
);
export default scenes;
