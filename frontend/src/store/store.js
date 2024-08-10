import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

// Create a persisted store for login
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the reducer for login
const rootReducer = combineReducers({
  login: loginSlice,
});

// Create persisted store with persistence
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
// Create persisted reducer with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
