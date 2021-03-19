import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiQuestion = async (apiQuestion) => {
  try {
    const cookie = await AsyncStorage.getItem("@cookie")
    const response = await Axios.get(apiQuestion, {
      headers: {
        Cookie: cookie
      }
    })
    return response.data;
  } catch (error) {
    return error.response
  }
}

export const apiInitTest = async ({
  testDefinition,
  testCompilation,
  serviceCallId,
  itemDefinition
}) => {
  try {
    const data = new FormData();
    data.append()
    const cookie = await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoQtiTest/Runner/init";
    const response1 = await Axios.get(endPoint, {
      headers: {
        'Cookie': cookie
      }, 
      params: {
        testDefinition: testDefinition,
        testCompilation: testCompilation,
        testServiceCallId: serviceCallId,
        itemDefinition: itemDefinition
      }
    })
    if(response1.data && response1.data.token){
      const token = response1.data.token;
      // const _response = await apiQuestionTest({
      //   token,
      //   testDefinition,
      //   testCompilation,
      //   serviceCallId,
      //   itemDefinition
      // });
      return {
        token,
        testDefinition,
        testCompilation,
        serviceCallId,
        itemDefinition
      }
    }
  } catch (error) {
    return error.response
  }
}

/**
 * Lấy câu hỏi
 * @param {Object} options
 * @param {String} options.token: token lấy từ api init 
 * @param {String} options.testDefinition
 * @param {String} options.testCompilation
 * @param {String} options.serviceCallId
 */
export const apiQuestionTest = async ({
  token,
  testDefinition,
  testCompilation,
  serviceCallId,
  itemDefinition
}) => {
  try {
    const endPoint = "http://aigle.blife.ai/taoQtiTest/Runner/getItem";
    const cookie = await AsyncStorage.getItem("@cookie");
    const response2 = await Axios.get(endPoint, {
      headers: {
        Cookie: cookie,
        'x-auth-token': token
      },
      params: {
        testDefinition: testDefinition,
        testCompilation: testCompilation,
        testServiceCallId: serviceCallId,
        itemDefinition: itemDefinition
      }
    })
    return response2;
  } catch (error) {
    return error.response
  }
}

