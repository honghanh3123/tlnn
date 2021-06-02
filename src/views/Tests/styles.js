import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height
export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent"
  },

  wrapperTitle: {
    width: "100%",
    paddingVertical: 20,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "white",
    textAlign: "center"
  },

  inlineButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
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
    width: "100%",
    height: "100%",
    backgroundColor: "transparent"
    //flex: 1
  },

  testItem: {
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    position: "relative",
    padding: 15,
    backgroundColor: "white"
  },

  testBorderLeft: {
    width: 8,
    marginTop: 2,
    borderRadius: 5
  },

  testTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },

  testContent: {
    marginLeft: 15,
    position: "relative",
    width: "90%"
  },

  btnFooter: {
    height: 30,
    marginBottom: 10,
    textAlign: "right"
  },

  textGroup: {
    display: "flex", 
    justifyContent: "space-evenly", 
    alignItems: "center", 
    flexDirection: "row",
    marginBottom: 4
  },

  layout: {
    width: "100%",
    // height: 0.8*screenHeight - 60
    marginBottom: 36,
    backgroundColor: "transparent"
  }
})