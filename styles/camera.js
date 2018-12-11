import { StyleSheet } from "react-native";
import { colors, padding } from "./global";

export default StyleSheet.create( {
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  main: {
    flexGrow: 1
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: padding.large
  },
  capture: {
    flex: 0,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderRadius: 100,
    alignItems: "flex-end",
    justifyContent: "center",
    borderColor: colors.lightGray,
    alignSelf: "center",
    width: 50,
    height: 50
  }
} );
