import { StyleSheet, Dimensions } from "react-native";
import { block } from "react-native-reanimated";
import { Autocomplete } from "@ui-kitten/components";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight
  },

  wrapperTitle: {
    marginTop: 30,
    marginBottom: 50,
    fontSize: 28,
    fontWeight: "bold"
  },

  wrapTopic: {
    borderStyle: "solid",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 250,
    display: "flex",
    flexDirection: "row",
    // height: 110,
    marginBottom: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  textTopic: {
    fontSize: 16,
    marginTop: 4
  },

  wrapImg: {
    width: "100%", 
    display: "flex", 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center"
  },

  scrollViewImg: {
    width: "100%", 
    padding: 10, 
    maxHeight: screenHeight - 200,
    bottom: 100
  }
})