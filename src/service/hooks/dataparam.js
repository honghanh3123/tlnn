import { apiQuestion } from "apis/questionTest";
import { DOMParser } from "react-native-html-parser";

const configs = {
  testDefinition: null,
  testCompilation: null,
  serviceCallId: null
}

const getConfigs = async (questionEndpoint) => {
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
      return {
        testDefinition,
        testCompilation,
        serviceCallId
      }
    }
  } catch (error) {
    console.log("Lỗi đọc html getConfigs", error);
  }
}

export default async (isReload, uri) => {
  if (isReload || !Object.values(configs).filter(val => val).length) {
    console.log("call api getConfigs");
    const newConfigs = await getConfigs(uri);
    Object.assign(configs, newConfigs)
  }
  return configs
}