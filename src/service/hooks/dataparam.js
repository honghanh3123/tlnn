import { apiQuestion } from "apis/questionTest";
import { DOMParser } from "react-native-html-parser";

const configs = {
  testDefinition: null,
  testCompilation: null,
  serviceCallId: null
}

const getConfigs = async (uri = "http%3A%2F%2Faigle.blife.ai%2FAigle.rdf%23i161184484529747881") => {
  const questionEndpoint = `http://aigle.blife.ai/taoDelivery/DeliveryServer/initDeliveryExecution?uri=${uri}`
  const response = await apiQuestion(questionEndpoint);
  const parser = new DOMParser();
  const result = parser.parseFromString(response, "text/html");
  let script = result.getElementById('amd-loader');
  let dataParams = JSON.parse(script.getAttribute("data-params"));
  let testDefinition = dataParams.testDefinition;
  let testCompilation = dataParams.testCompilation;
  let serviceCallId = dataParams.serviceCallId;
  console.log("dataparam", dataParams.testDefinition);
  console.log("dataparam", dataParams.testCompilation);
  console.log("dataparam", dataParams.serviceCallId);
  console.log("dataparam", dataParams);
  return {
    testDefinition,
    testCompilation,
    serviceCallId
  }
}

export default async (isReload, uri) => {
  if(isReload || !Object.values(configs).filter(val => val).length) {
    const newConfigs = await getConfigs(uri);
    Object.assign(configs, newConfigs)
  }
  return configs
}