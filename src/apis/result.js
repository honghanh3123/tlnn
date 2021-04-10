

import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getOntologyData = async () => {
  try {
    const endPoint = "http://aigle.blife.ai/taoDeliveryRdf/DeliveryMgmt/getOntologyData";
    const cookie = await AsyncStorage.getItem("@cookie");
    const response = await Axios.get(endPoint, {
      headers: {
        Cookie: cookie,
        'X-Requested-With': 'XMLHttpRequest'
      },
      params: {
        'extension': 'taoOutcomeUi',
        'perspective': 'results',
        'section': 'manage_results',
        'classUri': 'http://www.tao.lu/Ontologies/TAODelivery.rdf#AssembledDelivery',
        'hideInstances': '0',
        'filter': '*',
        'offset': '0',
        'limit': '30'
      }
    })

    return response.data;
  } catch (error) {
    return error.response
  }
}