import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.WORDITEM,
  properties: {
    _id: "string",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id"
}