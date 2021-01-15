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
    width: 156,
    height: 32,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 5
  },

  btnDone: {
    width: 156,
    height: 32,
    marginTop: 20,
    borderRadius: 5
  }
})