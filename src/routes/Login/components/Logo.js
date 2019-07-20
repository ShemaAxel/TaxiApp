import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../images/2.png")}
        />
        <Text style={styles.logoText}>Yego Cabs</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    justifyContent: "flex-end",
    alignItems: "center"
  },
  logoText: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    marginVertical: 15
  }
});
