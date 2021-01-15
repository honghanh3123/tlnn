import { StyleSheet } from "react-native";
import { block } from "react-native-reanimated";
import { Autocomplete } from "@ui-kitten/components";

export default StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
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
    width: 170,
    display: "flex",
    flexDirection: "row",
    height: 110,
    marginBottom: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  textTopic: {
    fontSize: 16,
    marginTop: 4
  }
})