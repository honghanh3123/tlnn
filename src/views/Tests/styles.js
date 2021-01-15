import { StyleSheet } from "react-native";
import { block, greaterThan } from "react-native-reanimated";
import { Autocomplete } from "@ui-kitten/components";

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },

  wrapperTitle: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold"
  },

  inlineButton: {
    display: "flex",
    flexDirection: "row"
  },

  btnNotDo: {
    width: 175,
    height: 32,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 5
  },

  btnDone: {
    width: 175,
    height: 32,
    marginTop: 20,
    borderRadius: 5,
    color: "#EEF0F2",
    backgroundColor: "#EEF0F2",
    borderColor: "#d0d0d0"
  },

  wrapperTest: {
    marginTop: 50
  },

  testItem: {
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 10,
    width: 370,
    display: "flex",
    flexDirection: "row",
    height: 110,
    marginBottom: 12
  },

  testBorderLeftGreen: {
    height: 106,
    width: 8,
    backgroundColor: "#45BA0E",
    marginTop: 2,
    borderRadius: 5
  },

  testTitleGreen: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#45BA0E"
  },

  testBorderLeftBlue: {
    height: 106,
    width: 8,
    backgroundColor: "#0E47BA",
    marginTop: 2,
    borderRadius: 5
  },

  testTitleBlue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E47BA"
  },

  testBorderLeftRed: {
    height: 106,
    width: 8,
    backgroundColor: "#FF5811",
    marginTop: 2,
    borderRadius: 5
  },

  testTitleRed: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5811"
  },

  testContent: {
    marginLeft: 15,
    marginTop: 12
  },

  testTime: {
    marginTop: 8,
    marginBottom: 8
  },

  createTime: {
    marginTop: 12,
    left: 100,
    color: "#838FA6"
  }
})