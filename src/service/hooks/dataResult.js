import { getOntologyData } from "apis/result";

const configs = {
  attributes: null,
  children: null
}

const getConfigs = async () => {
  const response = await getOntologyData();
  console.log("response", response);
  let attributes = response.tree.attributes;
  let children = response.tree.children;
  if(children && children.length > 0){
    children = children.filter(item => item.type == "instance");
  }
  return {
    attributes,
    children
  }
}

export default async (isReload) => {
  if(isReload || !Object.values(configs).filter(val => val).length) {
    const newConfigs = await getConfigs();
    Object.assign(configs, newConfigs)
  }
  return configs
}