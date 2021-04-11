import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.WORDDIR,
  properties: {
    "_id": "string",
    "label": "string",
    "count": "int",
    "type": "string",
    "isExpanded": "bool",
    "attributes": "string",
    "childrens": "string"
  },
  primaryKey: "_id"
}