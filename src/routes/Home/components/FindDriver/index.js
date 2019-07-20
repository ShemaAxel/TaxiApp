import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import { Actions } from "react-native-router-flux";

import styles from "./FindDriverStyles";
export const FindDriver = ({ selectedAddress }) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};

  return (
    <View style={styles.findDriverContainer}>
      <View style={styles.content}>
        <Text style={styles.text}> Processing your request</Text>
        <Icon style={styles.locationIcon} name="map-marker" />

        <View style={styles.pickup}>
          <Text>{selectedPickUp.name}</Text>
        </View>
        <Icon style={styles.toArrow} name="long-arrow-down" />
        <View style={styles.dropoff}>
          <Text>{selectedDropOff.name}</Text>
        </View>

        <View>
          <Text style={styles.termsText}>
            By booking you confirm that you accept our T & C
          </Text>
          <Button style={styles.cancelBtn} onPress={track}>
            <Text style={styles.cancelBtnText}>Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const track = () => {
  Actions.trackDriver();
};

export default FindDriver;
