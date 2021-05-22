import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  info_item: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 8
  }
})