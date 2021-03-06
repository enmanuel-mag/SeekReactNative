// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/species/iNatObs";
import logos from "../../../assets/logos";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import createUserAgent from "../../../utility/userAgent";
import { localizeNumber } from "../../../utility/helpers";

type Props = {
  +id: ?number,
  +timesSeen: ?number,
  +region: Object
};

const INatObs = ( { id, timesSeen, region }: Props ) => {
  const navigation = useNavigation();
  const [nearbySpeciesCount, setNearbySpeciesCount] = useState( null );

  useEffect( () => {
    let isFocused = true;

    const fetchNearbySpeciesCount = () => {
      const params = {
        lat: region.latitude,
        lng: region.longitude,
        radius: 50,
        taxon_id: id
      };

      const options = { user_agent: createUserAgent() };

      inatjs.observations.speciesCounts( params, options ).then( ( { results } ) => {
        if ( isFocused ) {
          setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
        }
      } ).catch( () => {
        if ( isFocused ) {
          setNearbySpeciesCount( 0 );
        }
      } );
    };

    if ( region && region.latitude !== null ) {
      fetchNearbySpeciesCount();
    }
    return () => { isFocused = false; };
  }, [region, id] );

  const renderObs = () => {
    let obs = null;

    if ( timesSeen && nearbySpeciesCount ) {
      obs = (
        <SpeciesDetailCard text="species_detail.inat_obs">
          <View style={[styles.center, styles.row]}>
            <TouchableOpacity onPress={() => navigation.navigate( "iNatStats" )}>
              <Image source={logos.bird} style={styles.bird} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              {region.latitude && (
                <>
                  <Text style={styles.secondHeaderText}>
                    {i18n.t( "species_detail.near" )}
                  </Text>
                  <Text style={styles.number}>
                    {localizeNumber( nearbySpeciesCount )}
                  </Text>
                </>
              )}
              <Text style={[
                styles.secondHeaderText,
                region.latitude && styles.margin
              ]}
              >
                {i18n.t( "species_detail.worldwide" )}
              </Text>
              <Text style={styles.number}>
                {localizeNumber( timesSeen )}
              </Text>
            </View>
          </View>
        </SpeciesDetailCard>
      );
    }
    return obs;
  };

  return renderObs();
};

export default INatObs;
