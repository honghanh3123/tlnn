import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.RESULT,
  properties: {
    _id: "string",
    id: "string",
    ttaker: "string",
    time: "string"
  },
  primaryKey: "_id",
}