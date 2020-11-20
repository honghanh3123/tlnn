import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINT } from "consts";

export const apiLogin = async (form) => {
  const params = new FormData();
  Object.keys(form).map(key => {
    params.append(key, form[key])
  });
  params.append("loginForm_sent", "1");
  params.append("connect", "Log in");

  try {
    const response = await Axios.post(`${API_ENDPOINT}/tao/Main/login`, params)
    await AsyncStorage.setItem("@cookie", JSON.stringify(response.headers['set-cookie']));
    return response
  } catch (error) {
    console.log(error);
    return error.response
  }
}