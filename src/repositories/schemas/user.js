import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.USER,
  properties: {
    _id: "string",
    name: "string",
    group: "string"
  },
  primaryKey: "_id",
}