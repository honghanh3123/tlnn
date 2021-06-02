import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  wrapper: {
    margin: 10,
    flexDirection: "column"
  },

  wrap_user_info: {
    width: "100%", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8
  },

  avata_user: {
    backgroundColor: '#194960', 
    borderRadius: 80, 
    width: 160, 
    height: 160, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  },

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