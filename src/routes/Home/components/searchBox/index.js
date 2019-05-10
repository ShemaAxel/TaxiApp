import React, { Component } from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./searchBoxStyle";

export const SearchBox = ({
  getInputData,
  toggleSearchResultModel,
  getAddressPredictions,
  selectedAddress
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  function handleInput(key, val) {
    getInputData({
      key,
      value: val
    });
    getAddressPredictions();
  }

  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose Pick Up location"
            onChangeText={handleInput.bind(this, "pickUp")}
            onFocus={() => toggleSearchResultModel("pickUp")}
            value={selectedPickUp && selectedPickUp.name}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP OFF</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
          <Input
            style={styles.inputSearch}
            placeholder="Choose Drop Off location"
            onChangeText={handleInput.bind(this, "dropOff")}
            onFocus={() => toggleSearchResultModel("dropOff")}
            value={selectedDropOff && selectedDropOff.name}
          />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
