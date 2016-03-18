'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
var ChampionList = require('./ChampionList');

class League extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{name: 'ChampionList', component: ChampionList}}
            configureScene={() => {
                return Navigator.SceneConfigs.FloatFromRight;
            }}
            renderScene={(route, navigator) => {
                if (route.component) {
                    return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
                }
            }}
        />
    );
  }
}

AppRegistry.registerComponent('League', () => League);
