import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.WORDITEM,
  properties: {
    _id: "string",
    label: "string",
    linkAudio: "string",
    linkVideo: "string",
    linkImg: "string",
    path: "string"
  },
  primaryKey: "_id",
}