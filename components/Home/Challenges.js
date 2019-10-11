// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/challenges";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import { setChallengeIndex } from "../../utility/challengeHelpers";
import GreenButton from "../UIComponents/GreenButton";
import GreenText from "../UIComponents/GreenText";
import { colors } from "../../styles/global";
import { setDrawer } from "../../utility/helpers";

type Props = {
  +navigation: any,
  +challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <View>
    <TouchableOpacity
      onPress={() => {
        setDrawer( "Challenges" );
        navigation.navigate( "Challenges" );
      }}
      style={styles.header}
    >
      <GreenText text={i18n.t( "challenges_card.header" ).toLocaleUpperCase()} />
    </TouchableOpacity>
    <ImageBackground
      source={backgrounds[challenge.homeBackgroundName]}
      style={styles.challengeContainer}
    >
      <Text style={[styles.challengeHeader, styles.textContainer]}>
        {i18n.t( challenge.month ).toLocaleUpperCase()}
      </Text>
      <Text style={[styles.challengeName, styles.textContainer]}>
        {i18n.t( challenge.name ).toLocaleUpperCase()}
      </Text>
      <View style={styles.row}>
        <Image source={logos.op} style={styles.image} />
        <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
      </View>
      <View style={styles.textContainer}>
        <GreenButton
          color={colors.seekGreen}
          handlePress={() => {
            setChallengeIndex( challenge.index );
            setDrawer( "ChallengeDetails" );
            navigation.navigate( "ChallengeDetails" );
          }}
          text={challenge.started
            ? i18n.t( "challenges_card.continue_challenge" ).toLocaleUpperCase()
            : i18n.t( "challenges_card.take_challenge" ).toLocaleUpperCase()}
        />
      </View>
      <View style={styles.margin} />
      <TouchableOpacity
        onPress={() => {
          setDrawer( "Challenges" );
          navigation.navigate( "Challenges" );
        }}
        style={styles.centeredContent}
      >
        <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

export default Challenges;
