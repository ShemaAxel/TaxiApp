import React from "react";
import request from "../../../util/request";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    const username = this.state.username;
    const password = this.state.password;
    request
      .get("http://192.168.10.104:3000/api/users/" + username + "/" + password)
      .finish((error, res) => {
        if (error) {
          console.log(error);
        } else {
          console.log(res.body);
          if (res.body === true) {
            Actions.home();
          } else {
            //no login
          }
        }
      });
  }

  home() {
    Actions.home();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={"Username"}
            placeholderTextColor="#ffffff"
            selectionColor="#f57c00"
            onSubmitEditing={() => this.password.focus()}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Password"}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          selectionColor="#f57c00"
          ref={input => (this.password = input)}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {/* onPress={this.home}> */}
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    alignItems: "center"
  },
  inputBox: {
    width: 300,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1c313a",
    borderRadius: 25,
    width: 300,
    paddingHorizontal: 16,
    marginVertical: 10,
    paddingVertical: 12
  },
  inputIcon: {
    position: "absolute",
    top: 2,
    left: 30
  },
  inputContainer: {
    marginTop: 10
  }
});
