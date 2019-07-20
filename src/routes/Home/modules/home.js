import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";
import axios from "axios";
//------------------
//Constants
//------------------
const {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  BOOK_CAR,
  GET_NEARBY_DRIVERS
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.04757; //how much zoomed in you want
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------
//Actions
//------------------

export function getCurrentLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: position
        });
      },

      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  };
}

export function getAddressPredictions() {
  return (dispatch, store) => {
    let userInput = store().home.resultTypes.pickUp
      ? store().home.inputData.pickUp
      : store().home.inputData.dropOff;
    RNGooglePlaces.getAutocompletePredictions(userInput, {
      country: "RW"
    })
      .then(results =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: results
        })
      )
      .catch(error => console.log(error.message));
  };
}

//User input

export function getInputData(payload) {
  return {
    type: GET_INPUT,
    payload
  };
}

export function toggleSearchResultModel(payload) {
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload
  };
}
// Get Addresses for google maps

//Get Selected Address

export function getSelectedAddress(payload) {
  const dummyNumbers = {
    baseFare: 0.4,
    timeRate: 0.14,
    distanceRate: 0.97,
    surge: 1
  };
  return (dispatch, store) => {
    RNGooglePlaces.lookUpPlaceByID(payload)
      .then(results => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results
        });
      })
      .then(() => {
        //Get distance and time
        if (
          store().home.selectedAddress.selectedPickUp &&
          store().home.selectedAddress.selectedDropOff
        ) {
          request
            .get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
              origins:
                store().home.selectedAddress.selectedPickUp.latitude +
                "," +
                store().home.selectedAddress.selectedPickUp.longitude,
              destinations:
                store().home.selectedAddress.selectedDropOff.latitude +
                "," +
                store().home.selectedAddress.selectedDropOff.longitude,
              mode: "driving",
              key: "AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
            })
            .finish((error, res) => {
              dispatch({
                type: GET_DISTANCE_MATRIX,
                payload: res.body
              });
            });
        }
        setTimeout(function() {
          if (
            store().home.selectedAddress.selectedPickUp &&
            store().home.selectedAddress.selectedDropOff
          ) {
            const fare = calculateFare(
              dummyNumbers.baseFare,
              dummyNumbers.timeRate,
              store().home.distanceMatrix.rows[0].elements[0].duration.value,
              dummyNumbers.distanceRate,
              store().home.distanceMatrix.rows[0].elements[0].distance.value,
              dummyNumbers.surge
            );
            dispatch({
              type: GET_FARE,
              payload: fare
            });
          }
        }, 2000);
      })
      .catch(error => console.log(error.message));
  };
}
//BOOK CAR

export function bookCar() {
  return (dispatch, store) => {
    const date = new Date();
    const nearByDrivers = store().home.nearByDrivers;
    const nearByDriver =
      nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)]; //random driver
    console.log("connected driver ", nearByDriver);
    const payload = {
      data: {
        userName: "lo",
        pickUp: {
          address: store().home.selectedAddress.selectedPickUp.address,
          name: store().home.selectedAddress.selectedPickUp.name,
          latitude: store().home.selectedAddress.selectedPickUp.latitude,
          longitude: store().home.selectedAddress.selectedPickUp.latitude
        },
        dropOff: {
          address: store().home.selectedAddress.selectedDropOff.address,
          name: store().home.selectedAddress.selectedDropOff.name,
          latitude: store().home.selectedAddress.selectedDropOff.latitude,
          longitude: store().home.selectedAddress.selectedDropOff.latitude
        },
        fare: store().home.fare,
        status: "pending",
        peaked: 0,
        date: date
      },
      nearByDriver: {
        // nearby
        socketId: nearByDriver.socketId,
        driverId: nearByDriver.driverId,
        latitude: nearByDriver.coordinate.coordinates[1],
        longitude: nearByDriver.coordinate.coordinates[0]
      }
    };
    // console.log("payload ", payload);
    request
      .post("http://192.168.24.160:3000/api/bookings")
      .set("Content-Type", "application/json")
      .send(payload)
      .finish((error, res) => {
        dispatch({
          type: BOOK_CAR,
          payload: res.body
        });
      });
  };
}
//get nearby drivers

export function getNearByDrivers() {
  return (dispatch, store) => {
    request
      .get("http://192.168.24.160:3000/api/driverLocation")
      .query({
        latitude: store().home.region.latitude,
        longitude: store().home.region.longitude
      })
      .finish((error, res) => {
        if (res) {
          dispatch({
            type: GET_NEARBY_DRIVERS,
            payload: res.body
          });
        }
      });
  };
}
//------------------
//ACTION_HANDLERS
//------------------
function handleGetCurrentLocation(state, action) {
  return update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude
      },
      longitude: {
        $set: action.payload.coords.longitude
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA
      }
    }
  });
}

function handleGetInputData(state, action) {
  const { key, value } = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  });
}

function handleToggleSearchResult(state, action) {
  if (action.payload === "pickUp") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true
        },
        dropOff: {
          $set: false
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
  if (action.payload === "dropOff") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: false
        },
        dropOff: {
          $set: true
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
}

function handleGetAddressPredictions(state, action) {
  return update(state, {
    predictions: {
      $set: action.payload
    }
  });
}
//get selected address handler
function handleGetSelectedAddress(state, action) {
  let selectedTitle = state.resultTypes.pickUp
    ? "selectedPickUp"
    : "selectedDropOff";
  return update(state, {
    selectedAddress: {
      [selectedTitle]: {
        $set: action.payload
      }
    },
    resultTypes: {
      pickUp: {
        $set: false
      },
      dropOff: {
        $set: false
      }
    }
  });
}

function handleGetDistanceMatrix(state, action) {
  return update(state, {
    distanceMatrix: {
      $set: action.payload
    }
  });
}

function handleGetFare(state, action) {
  return update(state, {
    fare: {
      $set: action.payload
    }
  });
}
//handle book car
function handleBookCar(state, action) {
  return update(state, {
    booking: {
      $set: action.payload
    }
  });
}
//handle get nearby drivers
function handleGetNearbyDrivers(state, action) {
  return update(state, {
    nearByDrivers: {
      $set: action.payload
    }
  });
}
//
function handleBookingConfirmed(state, action) {
  return update(state, {
    booking: {
      $set: action.payload
    }
  });
}
//Action handlers

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handleGetFare,
  BOOK_CAR: handleBookCar,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers,
  BOOKING_CONFIRMED: handleBookingConfirmed
};

const initialState = {
  region: {
    latitude: -1.9537,
    longitude: 30.1069,
    latitudeDelta: 0.2,
    longitudeDelta: 0.04
  },
  inputData: {},
  resultTypes: {},
  selectedAddress: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
