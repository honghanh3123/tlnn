import { createContext } from "react";

export const RootContext = createContext();

export const generateForm = (formConfig) => {
  const form = {};
  if (typeof formConfig !== "object") {
    return form
  }
  Object.keys(formConfig).map(key => {
    if (formConfig[key].defaultValue) {
      form[key] = defaultValue
      return key
    }
    switch (formConfig[key].type) {
      case "string":
        form[key] = "";
        return key
      case "date":
        form[key] = new Date();
        return key
      case "number":
        form[key] = 0;
        return key
      case "array":
        form[key] = [];
        return key
      default:
        form[key] = null;
        return key
    }
  })
  return form
}

export const getFileTail = (contentType) => {
  switch (true) {
    case contentType === "audio/mpeg":
      return "mp3"
    case /image/g.test(contentType):
      return contentType.split("/").pop()
    default:
      break;
  }
}