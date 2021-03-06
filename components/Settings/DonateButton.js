// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import GreenButton from "../UIComponents/Buttons/GreenButton";

const DonateButton = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.margin}>
      <Text style={styles.header}>{i18n.t( "settings.donate_header" ).toLocaleUpperCase()}</Text>
      <View style={styles.marginSmall} />
      <Text style={styles.text}>{i18n.t( "settings.donate_description" )}</Text>
      <View style={styles.marginMedium} />
      <GreenButton
        text="settings.donate"
        handlePress={() => navigate( "Donation" )}
      />
      <View style={styles.marginTop} />
      <View style={styles.marginTop} />
    </View>
  );
};

export default DonateButton;
