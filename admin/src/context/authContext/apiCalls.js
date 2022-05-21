import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
axios = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/adminLogin", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};