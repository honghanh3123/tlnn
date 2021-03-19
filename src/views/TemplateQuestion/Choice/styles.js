import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    margin: 5,
    height: "100%",
    width: "100%"
  },

  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  wrapContent: {
    height: "70%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  wrapItem: {
    display: "flex", 
    flexDirection:"row", 
    flexWrap: "wrap", 
    alignItems: "center", 
    justifyContent: "center"
  },

  wrapTopic: {
    height: 120,
    width: 120,
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 10, 
    margin: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  wrapChoise: {
    width: "100%", 
    height:"100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems:"center"
  },

  wrapNotChoose: {
    width: "100%", 
    height:"100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems:"center",
    backgroundColor: "gray"
  }
})