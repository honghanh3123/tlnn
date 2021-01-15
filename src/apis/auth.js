import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINT } from "consts";

export const apiLogin = async (form) => {
  const formData = new FormData();
  Object.keys(form).map(key => {
    formData.append(key, form[key])
  });
  formData.append("loginForm_sent", "1");
  formData.append("connect", "Log in");

  try {
    const response = await Axios.post(`${API_ENDPOINT}/tao/Main/login`, formData)
    if(response.headers['set-cookie']) {
      await AsyncStorage.setItem("@cookie", JSON.stringify(response.headers['set-cookie']));
      return response
    }
    return {
      status: 403
    }
  } catch (error) {
    console.log(error);
    return error.response
  }
}


