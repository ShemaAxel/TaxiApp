import React from "react";
import { Text } from "react-native";
import { View } from "native-base";

import styles from "./FareStyles.js";

export const Fare = ({ fare }) => {
  return (
    <View style={styles.fareContainer}>
      <Text>
        <Text style={styles.fareText}> Estimated AMOUNT:</Text>
        <Text style={styles.amount}>{fare} Rwf</Text>
      </Text>
    </View>
  );
};

export default Fare;
