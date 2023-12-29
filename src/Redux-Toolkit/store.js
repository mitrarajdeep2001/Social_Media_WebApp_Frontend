import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Additional configuration options if needed
});

export const persistor = persistStore(store);
export default store;
