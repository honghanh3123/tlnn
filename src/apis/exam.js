import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiExam = async () => {
  try {
    const cookie = await AsyncStorage.getItem("@cookie")
    const response = await Axios.get("http://aigle.blife.ai/taoDelivery/DeliveryServer/index", {
      headers: {
        Cookie: cookie
      }
    })
    return response.data;
  } catch (error) {
    return error.response
  }
}
