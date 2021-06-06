import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
// import {PopulartimesAPI} from "../utils/places"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getResults } from '../utils/search-helper'
import Page from '../examples/common/Page';
import MapHeader from '../examples/common/MapHeader';
import sheet from '../styles/sheet';
import ShowMap from '../examples/Map/ShowMap';
import ShowMapLocalStyle from '../examples/Map/ShowMapLocalStyle';
import MarkerView from '../examples/Annotations/MarkerView';
import SetPitch from '../examples/SetPitch';
import SetHeading from '../examples/SetHeading';
import ShowClick from '../examples/ShowClick';
import FlyTo from '../examples/FlyTo';
import FitBounds from '../examples/FitBounds';
import SetUserTrackingModes from '../examples/SetUserTrackingModes';
import SetUserLocationVerticalAlignment from '../examples/SetUserLocationVerticalAlignment';
import SetUserLocationRenderMode from '../examples/SetUserLocationRenderMode';
import ShowRegionDidChange from '../examples/ShowRegionDidChange';
import CustomIcon from '../examples/CustomIcon';
import YoYo from '../examples/YoYo';
import EarthQuakes from '../examples/EarthQuakes';
import GeoJSONSource from '../examples/GeoJSONSource';
import WatercolorRasterTiles from '../examples/WatercolorRasterTiles';
import TwoByTwo from '../examples/TwoByTwo';
import IndoorBuilding from '../examples/IndoorBuilding';
import QueryAtPoint from '../examples/QueryAtPoint';
import QueryWithRect from '../examples/QueryWithRect';
import ShapeSourceIcon from '../examples/ShapeSourceIcon';
import CustomVectorSource from '../examples/CustomVectorSource';
import ShowPointAnnotation from '../examples/Annotations/ShowPointAnnotation';
import AnimatedLine from '../examples/AnimatedLine';
import CreateOfflineRegion from '../examples/CreateOfflineRegion';
import DriveTheLine from '../examples/DriveTheLine';
import ImageOverlay from '../examples/ImageOverlay';
import DataDrivenCircleColors from '../examples/DataDrivenCircleColors';
import ChoroplethLayerByZoomLevel from '../examples/ChoroplethLayerByZoomLevel';
import PointInMapView from '../examples/PointInMapView';
import TakeSnapshot from '../examples/TakeSnapshot';
import TakeSnapshotWithMap from '../examples/TakeSnapshotWithMap';
import GetZoom from '../examples/GetZoom';
import GetCenter from '../examples/GetCenter';
import UserLocationChange from '../examples/UserLocationChange';
import Heatmap from '../examples/Annotations/Heatmap';
import RestrictMapBounds from '../examples/RestrictMapBounds';
import ShowAndHideLayer from '../examples/ShowAndHideLayer';
import ChangeLayerColor from '../examples/ChangeLayerColor';
import SourceLayerVisibility from '../examples/SourceLayerVisibility';
import SetDisplacement from '../examples/SetDisplacement';
import CompassView from '../examples/CompassView';
import BugReportTemplate from '../examples/BugReportExample';
import StyleJson from '../examples/StyleJson';
import ShapeSourceTS from '../examples/SymbolCircleLayer/ShapeSource';
import CacheManagement from '../examples/CacheManagement';
import CustomCallout from '../examples/Annotations/CustomCallout';

const styles = StyleSheet.create({
  exampleList: {
    flex: 1,
  },
  exampleListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  exampleListItemBorder: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  exampleListLabel: {
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

class ExampleItem {
  constructor(label, Component) {
    this.label = label;
    this.Component = Component;
    this.navigationType = 'Demo';
  }
}

class ExampleGroup {
  constructor(label, items) {
    this.label = label;
    this.items = items;
    this.navigationType = 'Group';
    this.Component = ({navigation}) => (
      <ExampleGroupComponent items={items} navigation={navigation} />
    );
  }
}

const BugReportPage = ({...props}) => (
  <Page {...props}>
    <BugReportTemplate />
  </Page>
);

const Examples = [
  new ExampleGroup('Map', [
    new ExampleItem('Show Map', ShowMap),
    new ExampleItem('Show Map With Local Style.JSON', ShowMapLocalStyle),
    new ExampleItem('Show Click', ShowClick),
    new ExampleItem('Show Region Did Change', ShowRegionDidChange),
    new ExampleItem('Two Map Views', TwoByTwo),
    new ExampleItem('Create Offline Region', CreateOfflineRegion),
    new ExampleItem('Get Pixel Point in MapView', PointInMapView),
    new ExampleItem('Show and hide a layer', ShowAndHideLayer),
    new ExampleItem('Change Layer Color', ChangeLayerColor),
    new ExampleItem('Source Layer Visiblity', SourceLayerVisibility),
    new ExampleItem('Style JSON', StyleJson),
  ]),
  new ExampleGroup('Camera', [
    new ExampleItem('Set Pitch', SetPitch),
    new ExampleItem('Set Heading', SetHeading),
    new ExampleItem('Fly To', FlyTo),
    new ExampleItem('Fit Bounds', FitBounds),
    new ExampleItem('Restrict Bounds', RestrictMapBounds),
    new ExampleItem('Set User Tracking Modes', SetUserTrackingModes),
    new ExampleItem('Yo Yo Camera', YoYo),
    new ExampleItem('Take Snapshot Without Map', TakeSnapshot),
    new ExampleItem('Take Snapshot With Map', TakeSnapshotWithMap),
    new ExampleItem('Get Current Zoom', GetZoom),
    new ExampleItem('Get Center', GetCenter),
    new ExampleItem('Compass View', CompassView),
  ]),
  new ExampleGroup('User Location', [
    new ExampleItem(
      'Set User Location Vertical Alignment',
      SetUserLocationVerticalAlignment,
    ),
    new ExampleItem('User Location Updates', UserLocationChange),
    new ExampleItem('Set Displacement', SetDisplacement),
    new ExampleItem('Set User Location Render Mode', SetUserLocationRenderMode),
  ]),
  new ExampleGroup('Symbol/CircleLayer', [
    new ExampleItem('Custom Icon', CustomIcon),
    new ExampleItem('Clustering Earthquakes', EarthQuakes),
    new ExampleItem('Shape Source From Icon', ShapeSourceIcon),
    new ExampleItem('Data Driven Circle Colors', DataDrivenCircleColors),
    new ExampleItem('Shape Source From Icon.TS', ShapeSourceTS),
  ]),
  new ExampleGroup('Fill/RasterLayer', [
    new ExampleItem('GeoJSON Source', GeoJSONSource),
    new ExampleItem('Watercolor Raster Tiles', WatercolorRasterTiles),
    new ExampleItem('Indoor Building Map', IndoorBuilding),
    new ExampleItem('Query Feature Point', QueryAtPoint),
    new ExampleItem('Query Features Bounding Box', QueryWithRect),
    new ExampleItem('Custom Vector Source', CustomVectorSource),
    new ExampleItem('Image Overlay', ImageOverlay),
    new ExampleItem(
      'Choropleth Layer By Zoom Level',
      ChoroplethLayerByZoomLevel,
    ),
  ]),
  new ExampleGroup('Annotations', [
    new ExampleItem('Show Point Annotation', ShowPointAnnotation),
    new ExampleItem('Marker View', MarkerView),
    new ExampleItem('Heatmap', Heatmap),
    new ExampleItem('Custom Callout', CustomCallout),
  ]),
  new ExampleGroup('Animations', [
    new ExampleItem('Animated Line', AnimatedLine),
    new ExampleItem('Animation Along a Line', DriveTheLine),
    new ExampleItem('Yo Yo Camera', YoYo),
  ]),
  new ExampleItem('Bug Report Template', BugReportPage),
  new ExampleItem('Cache management', CacheManagement),
];

function ExampleGroupComponent({items, navigation, showBack}) {
  function itemPress(item) {
    navigation.navigate(item.navigationType, item);
  }

  function renderItem({item}) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => itemPress(item)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Icon name="keyboard-arrow-right" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const back = showBack
    ? {
        onBack: () => {
          console.log('GoBACK');
          navigation.goBack();
        },
      }
    : {};

  const title = showBack
    ? navigation.getParam('label')
    : 'React Native Mapbox GL';

  return (
    <View style={sheet.matchParent}>
      {/* <MapHeader label={title} {...back} /> */}

      <View style={{ width: '100%', position: 'absolute', marginTop: 20, padding: 30, top:20,  }}>
  <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
    
    </View>

      <View style={{flex:1 , marginTop:150}}>
      <ShowMap/>
      </View>
    </View>
  );
}

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };


  constructor(props) {
    super(props);

    this.state = {
      locationDetails: {},
      isPress: false,
      busyHours: '',
      uery: '',
      queryResults: ''
    };
  }

  onChangeText = (text)=> {
    this.setState({...this.state, query: text})
    this.sendQuery();
  }
  async sendQuery () {
    try {
      const queryResults = await getResults(this.state.query);
      if (queryResults.error) throw Error(queryResults.error)
      this.setState({...this.state, queryResults: queryResults.response.features})
    } catch (e) {
      console.log('error')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isPress){
      console.log("Oyeee hoyeeee...")
      this.setState({...this.state, isPress: false})
      this.fetchData(this.state.locationDetails.place_id);
    }
  }

  async fetchData(placeId) {
    const baseUrl = "http://localhost:8000";
    const apiKey = "AIzaSyC94Sw7zn-GrVTnrXpL2shARAncAR8z5UA";
    const url = `${baseUrl}/busy-hours?apiKey=${apiKey}&placeId=${placeId}&dataType=today`;
    const response = await axios.get(url);
    this.setState({...this.state, busyHours:response.data.data.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue
      }, 10)/24})
    console.log(response.data.data.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue
    }, 10)/24,"==========");

  }

  render() {
    const {navigation} = this.props;
    const items = navigation.getParam('items') || Examples;
    return (
      <View style={sheet.matchParent}>
      {/* <MapHeader label={title} {...back} /> */}

      <View style={{ width: '100%', position: 'absolute', marginTop: 20, padding: 30, top:20,  }}>
  <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        console.log('dsjaskdjaldkjlkajsdlkajsdkjasd')
        // 'details' is provided when fetchDetails = true

        // console.log(details)
        // this.fetchData(details?.place_id);
        this.setState({...this.state, locationDetails: details, isPress: true});
        // console.log(details);
      }}
      fetchDetails
      query={{
        key: 'AIzaSyC94Sw7zn-GrVTnrXpL2shARAncAR8z5UA',
        language: 'en',
      }}
    />
        <TextInput
        style={styles.input}
        onChangeText={this.onChangeText}
        value={this.state.query}
        />
    </View>

      <View style={{flex:1 , marginTop:250}}>
        <Heatmap
            place={this.state.locationDetails}
            busyHours={this.state.busyHours}
        />
      {/*<ShowMap/>*/}
      {/*<MarkerView*/}
      {/*place={this.state.locationDetails}*/}
      {/*/>*/}
      </View>
    </View>
    );
  }
}

export default Home;
