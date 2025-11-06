import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../CreateSlace/CounterReducer';
const store = configureStore({
	reducer: {

		   counter: counterReducer,
	},
})
export default store