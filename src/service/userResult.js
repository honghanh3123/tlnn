import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserResults = async (dataUri) => {
  const endPoint = "http://aigle.blife.ai/taoOutcomeUi/Results/getResults";
  const cookie = await AsyncStorage.getItem("@cookie");
  const response = await Axios.get(endPoint, {
    headers: {
      Cookie: cookie,
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: {
      'classUri': dataUri, //data.name.attributes["data-uri"],
      'rows': 1000,
      'page': 1,
      'sortby': 'id',
      'sortorder': 'asc',
      'sorttype': 'string'
    }
  })
  return response.data;
}

