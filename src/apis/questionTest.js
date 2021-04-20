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
  serviceCallId
}) => {
  try {
    const cookie = await AsyncStorage.getItem("@cookie");
    const endPoint = "http://aigle.blife.ai/taoQtiTest/Runner/init";
    const response1 = await Axios.get(endPoint, {
      headers: {
        'Cookie': cookie
      }, 
      params: {
        testDefinition: testDefinition,
        testCompilation: testCompilation,
        testServiceCallId: serviceCallId
      }
    })
    
    const paramTest = {
      token: response1.data.token,
      itemIdentifier: response1.data.testContext.itemIdentifier,
      totalQuestion: response1.data.testMap.stats.total | 0
    }

    return paramTest;
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
    console.log("getItem testDefinition", testDefinition);
    console.log("getItem testCompilation", testCompilation);
    console.log("getItem serviceCallId", serviceCallId);
    console.log("getItem itemDefinition", itemDefinition);
    console.log("token", token);
    const endPoint = "http://aigle.blife.ai/taoQtiTest/Runner/getItem";
    const cookie = await AsyncStorage.getItem("@cookie");
    const response2 = await Axios.get(endPoint, {
      headers: {
        Cookie: cookie,
        'X-Auth-Token': token
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

