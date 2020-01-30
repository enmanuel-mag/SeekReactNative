// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { NavigationStackScreenProps } from "react-navigation-stack";
import inatjs from "inaturalistjs";
import Realm from "realm";
import RNFS from "react-native-fs";

import i18n from "../../i18n";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import realmConfig from "../../models/index";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import SpeciesError from "./SpeciesError";
import Spacer from "../UIComponents/iOSSpacer";
import SafeAreaView from "../UIComponents/SafeAreaView";
import {
  getSpeciesId,
  getRoute,
  checkForInternet,
  setRoute,
  getTaxonCommonName
} from "../../utility/helpers";
import { dirPictures } from "../../utility/dirStorage";
import NoInternetError from "./NoInternetError";
import createUserAgent from "../../utility/userAgent";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type State = {
  id: ?number,
  photos: Array<Object>,
  commonName: ?string,
  scientificName: ?string,
  about: ?string,
  seenDate: ?string,
  timesSeen: ?number,
  region: Object,
  observationsByMonth: Array<Object>,
  error: ?string,
  userPhoto: ?string,
  stats: Object,
  ancestors: Array<Object>,
  route: ?string,
  iconicTaxonId: ?number,
  wikiUrl: ?string
};

class SpeciesDetail extends Component<NavigationStackScreenProps, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      id: null,
      photos: [],
      commonName: null,
      scientificName: null,
      about: null,
      seenDate: null,
      timesSeen: null,
      region: {},
      observationsByMonth: [],
      error: null,
      userPhoto: null,
      stats: {},
      ancestors: [],
      route: null,
      iconicTaxonId: null,
      wikiUrl: null
    };

    ( this:any ).fetchiNatData = this.fetchiNatData.bind( this );
    ( this:any ).updateScreen = this.updateScreen.bind( this );
  }

  setError( newError: ?string ) {
    const { error } = this.state;

    if ( error !== newError ) {
      this.setState( { error: newError } );
    }
  }

  setRegion( latitude: number, longitude: number, id: number ) {
    this.checkIfSpeciesIsNative( latitude, longitude, id );
    this.setState( {
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      }
    } );
  }

  setTaxonStats( stats: Object ) {
    // this is causing a second render because it's being set in two places
    this.setState( { stats } );
  }

  async setupScreen() {
    const id = await getSpeciesId();

    this.checkIfSpeciesSeen( id );
    this.fetchTaxonDetails( id );
    this.fetchHistogram( id );

    const route = await getRoute();

    this.setState( {
      id,
      route
    } );
  }

  setUserPhoto( seenTaxa: Object ) {
    const { taxon } = seenTaxa;
    const { defaultPhoto } = taxon;

    if ( defaultPhoto ) {
      if ( defaultPhoto.backupUri ) {
        const uri = defaultPhoto.backupUri.split( "/Pictures/" );
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setState( { userPhoto: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.setState( { userPhoto: backupFilepath } );
        } );
      } else if ( defaultPhoto.mediumUrl ) {
        RNFS.readFile( defaultPhoto.mediumUrl, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setState( { userPhoto: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.setState( { userPhoto: defaultPhoto.mediumUrl } );
        } );
      }
    }
  }

  setSeenTaxa( seenTaxa: Object, id: number ) {
    const { taxon, latitude, longitude } = seenTaxa;
    const seenDate = seenTaxa ? formatShortMonthDayYear( seenTaxa.date ) : null;

    if ( latitude && longitude ) {
      this.checkIfSpeciesIsNative( latitude, longitude, id );
    }

    getTaxonCommonName( id ).then( ( deviceCommonName ) => {
      this.setState( {
        commonName: deviceCommonName,
        scientificName: taxon.name,
        iconicTaxonId: taxon.iconicTaxonId,
        seenDate,
        region: {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }
      } );
    } ).catch( () => console.log( "couldn't fetch device common name" ) );
  }

  setUserLocation( id: number ) {
    fetchTruncatedUserLocation().then( ( coords ) => {
      const { latitude, longitude } = coords;

      this.setRegion( latitude, longitude, id );
    } ).catch( () => this.setError( "location" ) );
  }

  fetchUserLocation( id: number ) {
    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.setUserLocation( id );
        }
      } );
    } else {
      this.setUserLocation( id );
    }
  }

  updateScreen() {
    this.fetchiNatData();
  }

  resetState() {
    this.setState( {
      photos: [],
      commonName: null,
      scientificName: null,
      about: null,
      seenDate: null,
      timesSeen: null,
      region: {},
      observationsByMonth: [],
      error: null,
      userPhoto: null,
      stats: {},
      ancestors: [],
      route: null,
      iconicTaxonId: null,
      wikiUrl: null
    } );
  }

  checkIfSpeciesSeen( id: number ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const seenTaxa = observations.filtered( `taxon.id == ${id}` )[0];

        if ( seenTaxa ) {
          this.setSeenTaxa( seenTaxa, id );
        } else {
          this.fetchUserLocation( id );
        }

        let userPhoto;
        const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;

        if ( seenTaxa ) {
          if ( Platform.OS === "ios" && seekv1Photos ) {
            const photoPath = `${seekv1Photos}/${seenTaxa.uuidString}`;
            if ( !RNFS.exists( photoPath ) ) {
              this.setUserPhoto( seenTaxa );
            } else {
              RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
                userPhoto = `data:image/jpeg;base64,${encodedData}`;
                this.setState( { userPhoto } );
              } ).catch( () => {
                this.setUserPhoto( seenTaxa );
              } );
            }
          } else if ( Platform.OS === "android" ) {
            this.setUserPhoto( seenTaxa );
          }
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchTaxonDetails( id: number ) {
    const { stats } = this.state;

    const params = {
      locale: i18n.currentLocale()
    };

    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( id, params, options ).then( ( response ) => {
      const taxa = response.results[0];
      const commonName = taxa.preferred_common_name;
      const scientificName = taxa.name;
      const conservationStatus = taxa.taxon_photos[0].taxon.conservation_status;
      const ancestors = [];
      const ranks = ["kingdom", "phylum", "class", "order", "family", "genus"];
      taxa.ancestors.forEach( ( ancestor ) => {
        if ( ranks.includes( ancestor.rank ) ) {
          ancestors.push( ancestor );
        }
      } );

      ancestors.push( {
        rank: "species",
        name: scientificName || null,
        preferred_common_name: commonName || null
      } );

      const photos = [];

      taxa.taxon_photos.forEach( ( photo ) => {
        if ( photo.photo.license_code && photos.length < 8 ) {
          photos.push( photo );
        }
      } );

      stats.endangered = ( conservationStatus && conservationStatus.status_name === "endangered" ) || false;

      getTaxonCommonName( id ).then( ( deviceCommonName ) => {
        this.setState( {
          commonName: deviceCommonName || commonName,
          scientificName,
          photos,
          wikiUrl: taxa.wikipedia_url,
          about: taxa.wikipedia_summary ? i18n.t( "species_detail.wikipedia", { about: taxa.wikipedia_summary.replace( /<[^>]+>/g, "" ) } ) : null,
          timesSeen: taxa.observations_count,
          iconicTaxonId: taxa.iconic_taxon_id,
          ancestors,
          stats
        } );
      } ).catch( () => {
        // console.log( err, "error fetching taxon details" );
      } );
    } ).catch( ( e ) => console.log( "couldn't fetch common name from device", e ) );
  }

  fetchHistogram( id: number ) {
    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.histogram( params, options ).then( ( response ) => {
      const countsByMonth = response.results.month_of_year;
      const observationsByMonth = [];

      for ( let i = 1; i <= 12; i += 1 ) {
        observationsByMonth.push( {
          month: i,
          count: countsByMonth[i]
        } );
      }
      this.setState( { observationsByMonth } );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }

  checkIfSpeciesIsNative( latitude: number, longitude: number, id: number ) {
    const { stats } = this.state;

    const params = {
      per_page: 1,
      lat: latitude,
      lng: longitude,
      radius: 50,
      taxon_id: id
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.search( params, options ).then( ( { results } ) => {
      if ( results.length > 0 ) {
        const { taxon } = results[0];
        if ( taxon ) {
          stats.threatened = taxon.threatened;
          stats.endemic = taxon.endemic;
          stats.introduced = taxon.introduced;
          stats.native = taxon.native;
          this.setTaxonStats( stats );
        }
      }
    } ).catch( ( err ) => {
      console.log( err, "err fetching native threatened etc" );
    } );
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  fetchiNatData( screen: ?string ) {
    this.setupScreen();
    this.checkInternetConnection();
    if ( screen === "similarSpecies" ) {
      this.resetState();
    }

    if ( Platform.OS === "android" ) {
      setTimeout( () => this.scrollToTop(), 1 );
      // hacky but this fixes scroll not getting to top of screen
    } else {
      this.scrollToTop();
    }
  }

  checkInternetConnection() {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        this.setError( "internet" );
      } else {
        this.setError( null );
      }
    } );
  }

  render() {
    const {
      about,
      commonName,
      id,
      observationsByMonth,
      photos,
      region,
      scientificName,
      seenDate,
      timesSeen,
      error,
      userPhoto,
      ancestors,
      stats,
      route,
      iconicTaxonId,
      wikiUrl
    } = this.state;

    const { navigation } = this.props;

    return (
      <>
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => this.resetState()}
          onWillFocus={() => this.fetchiNatData()}
        />
        <ScrollView
          ref={( ref ) => { this.scrollView = ref; }}
          contentContainerStyle={[styles.footerMargin, styles.background]}
        >
          {Platform.OS === "ios" && <Spacer />}
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.back" )}
            accessible
            onPress={() => {
              if ( route === "Match" ) {
                navigation.navigate( route, { ...navigation.state.params } );
              } else if ( route === "Species" ) {
                setRoute( "Main" );
                navigation.navigate( "Main" );
              } else if ( route ) {
                navigation.navigate( route );
              } else {
                navigation.navigate( "Main" );
              }
            }}
            style={styles.backButton}
          >
            <Image source={icons.backButton} />
          </TouchableOpacity>
          <SpeciesPhotos
            photos={photos}
            userPhoto={userPhoto}
          />
          <View style={styles.greenBanner}>
            {iconicTaxonId ? (
              <Text style={styles.iconicTaxaText}>
                {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()}
              </Text>
            ) : null}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.commonNameText}>{commonName || scientificName}</Text>
            <Text style={styles.scientificNameText}>{scientificName}</Text>
          </View>
          {error === "internet" ? (
            <SpeciesError
              seenDate={seenDate}
              updateScreen={this.updateScreen}
            />
          ) : (
            <NoInternetError
              about={about}
              ancestors={ancestors}
              commonName={commonName}
              error={error}
              fetchiNatData={this.fetchiNatData}
              id={id}
              observationsByMonth={observationsByMonth}
              region={region}
              seenDate={seenDate}
              stats={stats}
              timesSeen={timesSeen}
              wikiUrl={wikiUrl}
            />
          )}
        </ScrollView>
      </>
    );
  }
}

export default SpeciesDetail;
