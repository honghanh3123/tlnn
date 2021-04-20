import { apiQuestion, apiQuestionItem, apiInitTest } from "apis/questionTest";
import { DOMParser } from 'react-native-html-parser';

export const getQuestions = async (questionEndpoint) => {
  try {
    const response = await apiQuestion(questionEndpoint);
    if (response.includes("</div>")) {
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
        serviceCallId
      });
      return res;
    }
  } catch (error) {
    console.log("Lỗi đọc html getQuestions", error);
  }
}



