import {getOntologyData} from "apis/result";
export const getResults = async () => {
  const result = await getOntologyData();
  return {
    attributes: result.tree.attributes,
    children: result.tree.children
  };
}

