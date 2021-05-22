import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.TEST,
  properties: {
    _id: "string",
    nameTest: "string",
    timeTest: "string",
    attemps: "string"
  },
  primaryKey: "_id",
}