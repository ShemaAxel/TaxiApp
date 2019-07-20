import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import makeRootReducers from "./reducers";
import { createLogger } from "redux-logger";

//socket io configuration
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client/dist/socket.io";

//
let socket = io("http://192.168.24.160:3000", { jsonp: false }); //change this ip to 192.168.10.87:3000
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const log = createLogger({ diff: true, collapsed: true });

export default (initialState = {}) => {
  const middleware = [thunk, log, socketIoMiddleware];

  const enhancers = [];

  const store = createStore(
    makeRootReducers(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  return store;
};
