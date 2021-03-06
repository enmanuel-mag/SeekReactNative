import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row,
  footerMargin
} from "../global";

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 18,
    paddingHorizontal: 23,
    paddingTop: 23,
    position: "absolute",
    zIndex: 1
  },
  background: {
    backgroundColor: colors.white
  },
  checkmark: {
    marginRight: 10
  },
  commonNameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    letterSpacing: 0.3,
    lineHeight: 31,
    marginTop: 23
  },
  footerMargin,
  greenBanner: {
    backgroundColor: colors.seekForestGreen
  },
  headerMargins: {
    marginBottom: 11,
    marginTop: 45
  },
  humanText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 45,
    textAlign: "center"
  },
  iconicTaxaText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginLeft: 28,
    paddingBottom: Platform.OS === "android" ? 11 : 8,
    paddingTop: 12
  },
  linkText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    paddingTop: 10,
    textDecorationLine: "underline"
  },
  marginSmall: {
    marginTop: 21
  },
  row,
  rowMargin: {
    marginTop: 28
  },
  scientificNameText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 19,
    lineHeight: 21,
    marginTop: 10
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  textContainer: {
    marginHorizontal: 28
  }
} );
