import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  legend: {
    backgroundColor: colors.seekForestGreen,
    borderTopRightRadius: 40,
    paddingBottom: ( Platform.OS === "ios" && height > 670 ) ? 23 : 13,
    paddingLeft: 22,
    paddingRight: 28
  },
  legendHeader: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 56,
    width: "100%"
  },
  legendPosition: {
    bottom: 0,
    left: 0,
    position: "absolute"
  },
  locationIcon: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 50 / 2,
    height: 50,
    justifyContent: "center",
    marginBottom: 19,
    marginRight: 19,
    width: 50
  },
  map: {
    height: height - 75,
    width
  },
  margin: {
    marginBottom: 23
  },
  marginHorizontal: {
    marginHorizontal: 4.5
  },
  marginLarge: {
    marginTop: 29
  },
  marginSmall: {
    marginTop: 7
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginHorizontal: 25,
    marginTop: 15
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginLeft: 21,
    marginTop: 3
  },
  userLocation: {
    bottom: 19,
    position: "absolute",
    right: 19
  },
  whiteText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginTop: 18,
    textAlign: "center"
  }
} );
