import React, { Component } from "react";
import { View } from "native-base";
import MapView from "react-native-maps";
import styles from "./MapcontainerStyles";
import SearchBox from "../searchBox/index";
import SearchResults from "../searchResults/index";
export const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModel,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  carMarker,
  nearByDrivers
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {selectedPickUp && (
          <MapView.Marker
            coordinate={{
              latitude: selectedPickUp.latitude,
              longitude: selectedPickUp.longitude
            }}
            pinColor="green"
          />
        )}

        {selectedDropOff && (
          <MapView.Marker
            coordinate={{
              latitude: selectedDropOff.latitude,
              longitude: selectedDropOff.longitude
            }}
            pinColor="blue"
          />
        )}

        <MapView.Marker coordinate={region} pinColor="green" />
        {nearByDrivers &&
          nearByDrivers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.coordinates[1],
                longitude: marker.coordinate.coordinates[0]
              }}
              image={carMarker}
            />
          ))}
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModel={toggleSearchResultModel}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};
export default MapContainer;
