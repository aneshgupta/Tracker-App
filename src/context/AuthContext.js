import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import TrackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMsg: action.payload };
    case "signin":
      return { errorMsg: "", token: action.payload };
    case "clear_error":
      return { ...state, errorMsg: "" };
    case "signout":
      return { token: null, errorMsg: "" };
    default:
      return state;
  }
};

const clearErrorMsg = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await TrackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("mainFlow");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await TrackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
    console.log(err.response.data);
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });

    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });

  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMsg, tryLocalSignin },
  { token: null, errorMsg: "" }
);
