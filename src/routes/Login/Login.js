import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import Logo from "./components/Logo";
import Form from "./components/Form";
export default class Login extends React.Component {
  signup() {
    Actions.signup();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
        <Logo />
        <Form type="Login" />
        <View style={styles.signupText}>
          <Text style={styles.signupContent}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={this.signup}>
            <Text style={styles.signupButton}> Signup</Text>
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
