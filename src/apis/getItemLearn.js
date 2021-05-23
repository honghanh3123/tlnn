import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import { getFileTail } from "utils";

/**
 * Đẩy câu trả lời lên server
 * @param {} param0 
 * @fixme sửa lại tham số để truyền token, dataparams, body
 */
export const getItemData = async (uri) => {
  try {
    const cookie =await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoQtiItem/QtiCreator/getItemData";
    const response = await Axios.get(endPoint, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie
      },
      params: {
        "uri": uri ? uri : "http://aigle.blife.ai/Aigle.rdf#i160534482572796499"
      }
    })

    return response.data;
  } catch (error) {
    console.log("\n\n\n\n\n\n\n\nError getItemData:", error.response.data)
    return error.response;
  }
}

export const getLinkFile = async (uri) => {
  const cookie =await AsyncStorage.getItem("@cookie");
  const response = await Axios.get(uri, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Cookie": cookie
    },
    responseType: 'arraybuffer'
  })
  return {
    tail: getFileTail(response.headers["content-type"]),
    base64: Buffer.from(response.data, 'binary').toString('base64')
  }
}

