// @flow

import React from "react";
import { View, Text } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/challenges";
import { formatMonthYear } from "../../../utility/dateHelpers";

type Props = {
  challenge: Object
}

const ChallengeTitle = ( { challenge }: Props ) => (
  <View style={styles.margin}>
    <Text style={styles.challengeHeader}>
      {formatMonthYear( challenge.availableDate ).toLocaleUpperCase()}
    </Text>
    <Text style={styles.challengeName}>
      {i18n.t( challenge.name ).toLocaleUpperCase()}
    </Text>
  </View>
);

export default ChallengeTitle;
