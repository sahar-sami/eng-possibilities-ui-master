import { combineReducers } from "redux";
import allocationsReducer from "./allocationsReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  allocations: allocationsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
