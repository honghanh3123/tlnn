import { apiMoveTest } from "apis/moveTest";

export const moveitem = async (token, dataParam, {
  itemResponse,
  itemState,
  itemDuration
}) => {
  const res = await apiMoveTest(token, dataParam, {
    itemResponse,
    itemState, 
    itemDuration
  });

  return res;
}



