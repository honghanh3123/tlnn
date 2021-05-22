import { StyleSheet } from "react-native";
import { block, greaterThan } from "react-native-reanimated";
import { Autocomplete } from "@ui-kitten/components";

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },


  wrapperTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold"
  },

  wrapperTest: {
    marginTop: 30,
    width: "100%",
    flex: 1
  },

  testItem: {
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    // minHeight: 100,
    marginBottom: 12,
    position: "relative",
    padding: 15
  },

  testBorderLeftBlue: {
    // minHeight: 146,
    width: 8,
    backgroundColor: "#0E47BA",
    marginTop: 2,
    borderRadius: 5
  },

  testContent: {
    marginLeft: 15,
    position: "relative",
    width: "90%"
  },

  testTitleBlue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E47BA"
  },

  btnFooter: {
    height: 30,
    marginBottom: 10,
    textAlign: "right"
  },

})