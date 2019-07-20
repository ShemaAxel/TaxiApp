import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Logo from "./components/Logo";
import Form from "./components/FormSignup";
import { Actions } from "react-native-router-flux";
export default class Signup extends React.Component {
  login() {
    Actions.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
        <Logo />
        <Form type="Signup" />
        <View style={styles.signupText}>
          <Text style={styles.signupContent}>Already have an account?</Text>
          <TouchableOpacity onPress={this.login}>
            <Text style={styles.signupButton}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    justifyContent: "center"
  },
  signupText: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupContent: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16
  },
  signupButton: {
    color: "#f57c00",
    fontSize: 16,
    fontWeight: "500"
  }
});
