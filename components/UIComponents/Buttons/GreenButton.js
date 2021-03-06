
// @flow

import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/greenButton";

type Props = {
  +color?: ?Object,
  +handlePress: Function,
  +letterSpacing?: number,
  +text: string,
  +login?: boolean,
  +fontSize?: number,
  +width?: ?number,
  +allowFontScaling?: boolean
}

const GreenButton = ( {
  color,
  handlePress,
  letterSpacing,
  login,
  fontSize,
  text,
  width,
  allowFontScaling
}: Props ) => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={[
      styles.greenButton, color
      && { backgroundColor: color },
      login && styles.loginHeight,
      width && { width }
    ]}
  >
    <Text
      style={[styles.buttonText, { letterSpacing }, { fontSize }]}
      allowFontScaling={allowFontScaling}
    >
      {i18n.t( text ).toLocaleUpperCase()}
    </Text>
  </TouchableOpacity>
);

GreenButton.defaultProps = {
  fontSize: 18,
  login: false,
  letterSpacing: 1.0,
  color: null,
  width: null,
  allowFontScaling: true
};

export default GreenButton;
