import React, { Component } from "react";
import { View, Text } from "react-native";
import MapContainer from "./MapContainer/index";

import { Container } from "native-base";
import { Actions } from "react-native-router-flux";

import HeaderComponent from "../../../components/HeaderComponent/index";
import FooterComponent from "../../../components/FooterComponent/index";
import Fare from "./Fare/index";
import FaButton from "./FloatingActionButton/index";
import FindDriver from "./FindDriver/index";
const logo = require("../../../assets/img/logo2.png");
const carMarker = require("../../../assets/img/carMarker.png");

class Home extends Component {
  componentDidMount() {
    var rx = this;
    this.props.getCurrentLocation();
    setTimeout(function() {
      rx.props.getNearByDrivers();
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.booking.status === "confirmed") {
      Actions.trackDriver({ type: "reset" });
    }
    this.props.getCurrentLocation();
  }
  //
  render() {
    const region = {
      latitude: -1.9537,
      longitude: 30.1069,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.04
    };

    const { status } = this.props.booking;
    return (
      <Container>
        {(status !== "pending" && (
          <View style={{ flex: 1 }}>
            <HeaderComponent logo={logo} />
            <MapContainer
              region={this.props.region}
              getInputData={this.props.getInputData}
              toggleSearchResultModel={this.props.toggleSearchResultModel}
              getAddressPredictions={this.props.getAddressPredictions}
              resultTypes={this.props.resultTypes}
              predictions={this.props.predictions}
              getSelectedAddress={this.props.getSelectedAddress}
              selectedAddress={this.props.selectedAddress}
              carMarker={carMarker}
              nearByDrivers={this.props.nearByDrivers}
            />
            <FaButton onPressAction={() => this.props.bookCar()} />
            {this.props.fare && <Fare fare={this.props.fare} />}
            {/* <FooterComponent /> */}
          </View>
        )) || (
          <View style={{ flex: 1 }}>
            <FindDriver selectedAddress={this.props.selectedAddress} />
          </View>
        )}
      </Container>
    );
  }
}

export default Home;
