import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.TESTDETAIL,
  properties: {
    _id: "string",
    apiQuestion: "string",
    itemIdentifier: "string",
    baseUrl: "string",
    token: "string",
    typeQuestion: "string",
    question: "string",
    answers: "string",
    paramTest: "string",
    suggestQuestion: "string"
  },
  primaryKey: "_id",
}


