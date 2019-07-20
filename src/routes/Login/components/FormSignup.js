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
import { State } from "react-native-gesture-handler";
export default class FormSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Boom...!",
      email: "",
      telephone: "",
      password: ""
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const user = {
      username: this.state.username,
      email: this.state.email,
      telephone: this.state.telephone,
      password: this.state.password
    };
    request
      .post("http://192.168.10.104:3000/api/users")
      .set("Content-Type", "application/json")
      .send(user)
      .finish((error, res) => {
        if (error) {
          console.log(error);
        } else {
          this.setState({
            username: "",
            email: "",
            telephone: "",
            password: ""
          });
          console.log(res);
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Username"}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          selectionColor="#f57c00"
          onSubmitEditing={() => this.email.focus()}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Email"}
          placeholderTextColor="#ffffff"
          keyboardType="email-address"
          selectionColor="#f57c00"
          ref={input => (this.email = input)}
          onSubmitEditing={() => this.password.focus()}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Telephone"}
          placeholderTextColor="#ffffff"
          selectionColor="#f57c00"
          onSubmitEditing={() => this.email.focus()}
          onChangeText={telephone => this.setState({ telephone })}
          value={this.state.telephone}
        />
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
    top: 8,
    left: 37
  }
});
