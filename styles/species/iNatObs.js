import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  stats: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23
  },
  button: {
    padding: 10
  },
  image: {
    height: 65,
    width: 81,
    resizeMode: "contain"
  },
  textContainer: {
    marginLeft: 22
  },
  secondHeaderText: {
    fontSize: 19,
    fontFamily: fonts.medium,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  number: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: fonts.light,
    color: colors.black
  }
} );