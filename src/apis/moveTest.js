import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Đẩy câu trả lời lên server
 * @param {} param0 
 * @fixme sửa lại tham số để truyền token, dataparams, body
 */
export const apiMoveTest = async (token, dataParam, {
  itemResponse,
  itemState,
  itemDuration
}) => {
  try {
    const data = new FormData();

    data.append("itemResponse", itemResponse)
    data.append("itemState", itemState)
    data.append("direction", "next");
    data.append("scope", "item");
    data.append("itemDuration", itemDuration);
    const cookie =await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoQtiTest/Runner/move";
    const response = await Axios.post(endPoint, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie,
        "X-Auth-Token": token,
        "Content-Type": "multipart/form-data"
      },
      params: {
        testDefinition: dataParam.testDefinition, 
        testCompilation: dataParam.testCompilation, 
        testServiceCallId: dataParam.serviceCallId,
        itemDefinition: dataParam.itemDefinition, 
      }
    })

    return response.data;
  } catch (error) {
    console.log("\n\n\n\n\n\n\n\nErrororor:", error)
    return error.response
  }
}

