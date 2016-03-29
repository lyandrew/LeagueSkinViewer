'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChampionList from './ChampionList';
import ChampionDetail from './ChampionDetail';

var _navigator;
React.BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
     case 'ChampionDetail':
       return (
         <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
           onPress={() => navigator.pop()}>
           <Text style={{color: 'white', margin: 10,}}>
             Back
           </Text>
         </TouchableOpacity>
       );
     default:
      return null;
     }
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return null;
  }
};

class League extends Component {
  constructor(props) {
    super(props)
    this.state = {
      champion: ''
    }
  }
  renderScene (route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'ChampionListScreen':
        return (
          <ChampionList
            navigator={navigator}
            onSelection={ (champion) => {
              navigator.push({
                name: 'ChampionDetail',
                champion: this.setState({champion:champion})
              })
            }}
            />
        );
      case 'ChampionDetail':
        console.log('champion',this.state.champion)
        return (
          <ChampionDetail
            champion={this.state.champion}
            />
        )
      }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'ChampionListScreen'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('com.skins.league', () => League);
