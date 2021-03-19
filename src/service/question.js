import { apiQuestion, apiQuestionItem, apiInitTest } from "apis/questionTest";
import { DOMParser } from 'react-native-html-parser';

export const getQuestions = async (itemDefinition) => {
  const questionEndpoint = "http://aigle.blife.ai/taoDelivery/DeliveryServer/initDeliveryExecution?uri=http%3A%2F%2Faigle.blife.ai%2FAigle.rdf%23i161184484529747881"
  const response = await apiQuestion(questionEndpoint);
  const parser = new DOMParser();
	const result = parser.parseFromString(response, "text/html");
  let script = result.getElementById('amd-loader');
  let dataParams = JSON.parse(script.getAttribute("data-params"));
  let testDefinition = dataParams.testDefinition;
  let testCompilation = dataParams.testCompilation;
  let serviceCallId = dataParams.serviceCallId;
  const res = await apiInitTest({
    testCompilation,
    testDefinition,
    serviceCallId,
    itemDefinition
  });
  return res;
}



