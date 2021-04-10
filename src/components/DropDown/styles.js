import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: "#4ca6e1", //`#${colorHeader[itemIndex%3]}`,
    padding: 20,
    marginTop: 20,
    width: screenWidth - 50
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    //backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    width: screenWidth - 80,
    display: "flex", 
    justifyContent: "flex-end",
    backgroundColor: '#9cd1f3',
    marginTop: 10
  },
})