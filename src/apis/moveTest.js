import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Đẩy câu trả lời lên server
 * @param {} param0 
 * @fixme sửa lại tham số để truyền token, dataparams, body
 */
export const apiMoveTest = async (token, dataParam, {
  itemResponse,
  itemState,
  itemDuration
}) => {
  try {
    const data = new FormData();
    data.append("itemResponse", itemResponse)
    data.append("itemState", itemState)
    data.append("direction", "next");
    data.append("scope", "item");
    data.append("itemDuration", " 5.007355000008829");
    const cookie =await AsyncStorage.getItem("@cookie");
    // console.log("itemResponse", itemResponse)
    // console.log("itemState", itemState)
    // console.log("itemDuration", itemDuration);
    // console.log("cookie", cookie);
    // console.log("token",token);
    // console.log("testDefinition", dataParam.testDefinition);
    // console.log("testCompilation", dataParam.testCompilation);
    // console.log("testServiceCallId", dataParam.serviceCallId);
    // console.log("itemDefinition", dataParam.itemDefinition);
    const endPoint = "?testDefinition=http://aigle.blife.ai/Aigle.rdf%23i161184469672077879&testCompilation=http://aigle.blife.ai/Aigle.rdf%23i161184484581707882-|http://aigle.blife.ai/Aigle.rdf%23i161184484519257883+&testServiceCallId=http://aigle.blife.ai/Aigle.rdf#i161605139687998503&itemDefinition=item-1";
    const response = await Axios.post("http://aigle.blife.ai/taoQtiTest/Runner/move", data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie,
        "X-Auth-Token": token,
        "Content-Type": "multipart/form-data"
      },
      params: {
        testDefinition: "http://aigle.blife.ai/Aigle.rdf#i161184469672077879",
        testCompilation: "http://aigle.blife.ai/Aigle.rdf#i161184484581707882-|http://aigle.blife.ai/Aigle.rdf#i161184484519257883+",
        testServiceCallId: "http://aigle.blife.ai/Aigle.rdf#i161605233954628514",
        itemDefinition: "item-1"
      }
    })

    console.log("\n\n\n\n\n\n\n\n\n\napiMoveTest", response.data);
  } catch (error) {
    console.log("\n\n\n\n\n\n\n\nErrororor:", error.response.data)
    return error.response
  }
}

