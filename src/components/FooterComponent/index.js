import React, { Component } from "react";
import { Text, Image } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./footerComponentStyles";
export const FooterComponent = () => {
  const tabs = [
    {
      tile: "taxiCars",
      subTitle: "",
      icon: "car"
    },
    {
      tile: "taxiDrivers",
      subTitle: "",
      icon: "car"
    },
    {
      tile: "taxiStations",
      subTitle: "",
      icon: "car"
    },
    {
      tile: "taxiShare",
      subTitle: "",
      icon: "car"
    }
  ];

  return (
    <Footer>
      <FooterTab style={styles.footerContainer}>
        {tabs.map((obj, index) => {
          <Button key={index}>
            <Icon size={20} name={obj.icon} />
            <Text style={{ fontSize: 20, color: index === 0 ? "red" : "blue" }}>
              {obj.tile}
            </Text>
            <Text style={styles.subText}>{obj.subTitle}</Text>
          </Button>;
        })}
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;
