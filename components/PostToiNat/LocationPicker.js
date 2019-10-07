// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import LocationMap from "../Home/LocationMap";
import { fetchUserLocation } from "../../utility/locationHelpers";
import styles from "../../styles/home/locationPicker";
import headerStyles from "../../styles/uiComponents/greenHeader";
import backStyles from "../../styles/uiComponents/backArrow";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  +latitude: number,
  +longitude: number,
  +updateLocation: Function,
  +toggleLocationPicker: Function
}

class LocationPicker extends Component<Props> {
  constructor( {
    latitude,
    longitude
  }: Props ) {
    super();

    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude,
        longitude
      }
    };

    this.onRegionChange = this.onRegionChange.bind( this );
    this.returnToUserLocation = this.returnToUserLocation.bind( this );
  }

  onRegionChange( newRegion ) {
    this.setState( { region: newRegion } );
  }

  returnToUserLocation() {
    fetchUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          region: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }
        } );
      }
    } ).catch( ( err ) => {
      console.log( err );
    } );
  }

  render() {
    const { region } = this.state;
    const { updateLocation, toggleLocationPicker } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={headerStyles.container}>
          <TouchableOpacity
            hitSlop={backStyles.touchable}
            onPress={() => toggleLocationPicker()}
            style={backStyles.backButton}
          >
            <Image source={icons.backButton} />
          </TouchableOpacity>
          <Text style={headerStyles.text}>{i18n.t( "posting.edit_location" ).toLocaleUpperCase()}</Text>
        </View>
        <View style={styles.mapContainer}>
          <LocationMap
            onRegionChange={this.onRegionChange}
            posting
            region={region}
            returnToUserLocation={this.returnToUserLocation}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.margin} />
          <GreenButton
            handlePress={() => updateLocation( region.latitude, region.longitude )}
            text={i18n.t( "posting.save_location" ).toLocaleUpperCase()}
          />
        </View>
      </View>
    );
  }
}

export default LocationPicker;
