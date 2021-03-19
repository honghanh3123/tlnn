const axios = require("axios")
const FormData = require("form-data")

const formData = new FormData()

formData.append("itemResponse", ` {"RESPONSE":{"list":{"identifier":["choice_3"]}}}`.trim())
formData.append("itemState", ` {"RESPONSE":{"response":{"list":{"identifier":["choice_3"]}}}}`.trim())
formData.append("direction", "next")
formData.append("scope", "item")
formData.append("itemDuration", "5.007355000008829")

axios.default.post("http://aigle.blife.ai/taoQtiTest/Runner/move", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    "Cookie": `__cfduid=d22c2d0185402c43edd5a1f39ce7840801614697199; tao_xS2lIq62=7crgige17ddca42nf99jfs917n`,
    "X-Auth-Token": "09ae6bb818a5a8f7eeb8e16bb6d93e6f3c9249b4"
  },
  params: {
    "testDefinition": "http://aigle.blife.ai/Aigle.rdf#i161184469672077879",
    "testCompilation": "http://aigle.blife.ai/Aigle.rdf#i161184484581707882-|http://aigle.blife.ai/Aigle.rdf#i161184484519257883+",
    "testServiceCallId": "http://aigle.blife.ai/Aigle.rdf#i161590551338658382",
    "itemDefinition": "item-1"
  }
}).then(result => console.log(result.data))
  .catch((error) => { console.log("Looxi", error.response.data) })