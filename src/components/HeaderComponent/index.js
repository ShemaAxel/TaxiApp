import React, { Component } from "react";
import { Text, Image } from "react-native";
import { Header, Left, Right, Body, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderStylesComponent";
export const HeaderComponent = ({ logo }) => {
  return (
    <Header
      style={{ backgroundColor: "#2c3e50" }}
      androidStatusBarColor="#2c3e50"
    >
      <Left style={{ flex: 2 }}>
        <Button transparent>
          <Icon name="bars" style={styles.icon} />
        </Button>
      </Left>
      <Body style={{ flex: 1 }}>
        {(logo && (
          <Image resizeMode="contain" style={styles.logo} source={logo} />
        )) || <Text style={styles.headerText}>Driver on the way</Text>}
      </Body>
      <Right style={{ flex: 2 }}>
        <Button transparent>
          <Icon name="rocket" style={styles.icon} />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderComponent;
