// Step 1
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

//import userReducer from "./user-slice";
import darkModeReducer from "./dark-slice";

// Step 2
const reducers = combineReducers({
  darkMode: darkModeReducer,
});

// Step 3
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["darkMode"], //여기에 다크모드를 추가하지 않는다면 무슨 일이 일어날까요?
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Step 4
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
