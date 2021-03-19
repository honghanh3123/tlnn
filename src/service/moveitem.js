import { apiQuestion, apiQuestionItem, apiInitTest } from "apis/questionTest";
import { DOMParser } from 'react-native-html-parser';
import { apiMoveTest } from "apis/moveTest";

export const moveitem = async (token, dataParam, {
  itemResponse,
  itemState,
  itemDuration
}) => {
  console.log("moveitem", token);
  console.log("moveitem", dataParam.testDefinition);
  console.log("moveitem", dataParam.testCompilation);
  console.log("moveitem", dataParam.serviceCallId);
  console.log("moveitem", itemResponse);
  console.log("moveitem", itemState);
  console.log("moveitem", itemDuration);
  const res = await apiMoveTest(token, dataParam, {
    itemResponse,
    itemState, 
    itemDuration
  });

  return res;
}



