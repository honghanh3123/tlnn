import { SHEMAS_NAME } from "consts/schema";

export default {
  name: SHEMAS_NAME.WORDDIR,
  properties: {
    "_id": "int",
    "label": "string",
    "count": "int",
    "type": "string",
    "isExpanded": "bool",
    "attributes": "string",
    "childrens": "string"
  },
  primaryKey: "_id"
}