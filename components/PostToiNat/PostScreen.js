// @flow

import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/posting/postToiNat";
import iconicTaxa from "../../assets/iconicTaxa";
import GreenHeader from "../GreenHeader";
import i18n from "../../i18n";
import icons from "../../assets/icons";

type Props = {
  navigation: any
};

class PostScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      location: "2568 Oak St, San Francisco, CA",
      date: "Apr 5, 2019 at 5:11 PM",
      captive: "no",
      geoprivacy: "open",
      taxon: {
        preferredCommonName: "Cali Salamander",
        name: "Something longer",
        iconicTaxonId: 3
      }
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      taxon,
      date,
      location,
      captive,
      geoprivacy
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => {
              // fetch user location without truncated coordinates
              // display current date
            }}
          />
          <GreenHeader
            navigation={navigation}
            header={i18n.t( "posting.header" )}
          />
          <View style={styles.textContainer}>
            <View style={styles.card}>
              <Image style={styles.image} source={iconicTaxa[taxon.iconicTaxonId]} />
              <View style={styles.speciesNameContainer}>
                <Text style={styles.commonNameText}>
                  {taxon.preferredCommonName ? taxon.preferredCommonName : taxon.name}
                </Text>
                <Text style={styles.text}>{taxon.name}</Text>
              </View>
            </View>
          </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.thinCard}>
              <Image style={styles.icon} source={icons.locationPin} />
              <View style={styles.row}>
                <Text style={styles.greenText}>
                  {i18n.t( "posting.date" ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.text}>
                  {date}
                </Text>
              </View>
              <Image style={styles.buttonIcon} source={icons.backButtonGreen} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.thinCard}>
              <Image style={styles.icon} source={icons.locationPin} />
              <View style={styles.row}>
                <Text style={styles.greenText}>
                  {i18n.t( "posting.location" ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.text}>
                  {location}
                </Text>
              </View>
              <Image style={styles.buttonIcon} source={icons.backButtonGreen} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.thinCard}>
              <Image style={styles.icon} source={icons.locationPin} />
              <View style={styles.row}>
                <Text style={styles.greenText}>
                  {i18n.t( "posting.geoprivacy" ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.text}>
                  {geoprivacy}
                </Text>
              </View>
              <Image style={styles.buttonIcon} source={icons.backButtonGreen} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.thinCard}>
              <Image style={styles.icon} source={icons.locationPin} />
              <View style={styles.row}>
                <Text style={styles.greenText}>
                  {i18n.t( "posting.captive" ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.text}>
                  {captive}
                </Text>
              </View>
              <Image style={styles.buttonIcon} source={icons.backButtonGreen} />
            </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => console.log( "clicked" )}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "posting.header" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default PostScreen;