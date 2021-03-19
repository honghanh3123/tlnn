import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: "100%",
    width: "100%"
  },
  
  wrapperTitle: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 16
  },

  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  wrapContent: {
    height: "80%",
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  wrapItem: {
    display: "flex", 
    flexDirection:"row", 
    flexWrap: "wrap", 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: 20
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

  orderResult: {
    display: "flex", 
    flexDirection: "row", 
    marginTop: 40, 
    minHeight: 30,
    borderStyle: "solid",
    borderBottomColor: "#d0d0d0",
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: "center", 
    alignItems: "center",
    width: screenWidth - 50,
    flexWrap: "wrap"
  }
})