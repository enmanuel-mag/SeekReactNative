import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

import styles from "../../../styles/home/challenges";
import realmConfig from "../../../models";
import Challenges from "./Challenges";
import GreenText from "../../UIComponents/GreenText";
import NoChallenges from "./NoChallenges";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";

const ChallengeCard = () => {
  const navigation = useNavigation();
  const [state, setState] = useState( {
    challenge: null,
    loading: true
  } );

  const fetchLatestChallenge = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100" );
        if ( incompleteChallenges.length > 0 ) {
          const latestChallenge = incompleteChallenges.sorted( "availableDate", true );
          setState( {
            challenge: latestChallenge[0],
            loading: false
          } );
        } else {
          setState( { loading: false } );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const renderChallenge = () => {
    if ( state.loading ) {
      return (
        <View style={styles.loading}>
          <LoadingWheel color={colors.black} />
        </View>
      );
    }

    if ( state.challenge ) {
      return <Challenges challenge={state.challenge} />;
    }

    return <NoChallenges />;
  };

  useEffect( () => {
    const unsub = navigation.addListener( "focus", () => {
      fetchLatestChallenge();
    } );

    return unsub;
  }, [navigation] );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Challenges" )}
        style={styles.header}
      >
        <GreenText text="challenges_card.header" />
      </TouchableOpacity>
      {renderChallenge()}
    </View>
  );
};

export default ChallengeCard;
